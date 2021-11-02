const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const delegators = fs
  .readFileSync(
    path.resolve(path.dirname(__dirname), process.env.DELEGATORS_PATH),
    "utf8"
  )
  .split("\n")
  .map((d) => d.trim());

const isDelegator = (delegatorId) => {
  return delegators.includes(delegatorId);
};

const getMintStatus = async (req, walletCount = null) => {
  walletCount =
    walletCount || (await global.db.controllers.Wallet.getAll()).length;
  let threshold = parseInt(process.env.MINT_THRESHOLD);
  let stepHead = parseInt(process.env.MINT_STEPHEAD);
  let minted = Math.round(walletCount * stepHead);
  let volume = Math.round(threshold - minted);
  volume = volume < stepHead ? 0 : volume;
  let percentage =
    volume > 0 ? parseFloat(((minted / threshold) * 100).toFixed(2)) : 100.0;

  let delegator = isDelegator(req.headers["x-delegator-id"]);

  return {
    stepHead,
    minted,
    volume,
    threshold,
    walletCount,
    percentage,
    delegator,
  };
};

// Retrieves minting status
router.get("/status", async (req, res) => {
  return res.json({
    success: true,
    ...(await getMintStatus(req)),
  });
});

// Retrives a single wallet from wallet address
router.get("/wallet/:address", async (req, res) => {
  let { address } = req.params;
  let wallets = await global.db.controllers.Wallet.find("address", address);
  if (wallets.length > 0) {
    return res.json({
      success: true,
      data: wallets[0],
      ...(await getMintStatus(req)),
    });
  }

  return res.json({
    success: false,
    error: "wallet not found",
  });
});

// Adds a wallet into database
router.post("/wallet", async (req, res) => {
  let form = req.body;
  if (typeof form == "object") form.ts = Date.now();
  if (
    Object.keys(global.db.controllers.Wallet.schema).every(
      (k) => form.hasOwnProperty(k) && form[k] !== ""
    )
  ) {
    let preExists = await global.db.controllers.Wallet.find(
      "address",
      form.address
    );
    let _mint = await getMintStatus(req);

    if (!_mint.delegator) {
      return res.json({
        success: false,
        error: "you're not a delegator",
        ..._mint,
      });
    }

    if (preExists.length > 0)
      return res.status(403).json({
        success: false,
        error: "wallet by this address already exists",
        ..._mint,
      });

    if (!_mint.volume > 0 || _mint.volume < _mint.stepHead)
      return res.json({
        success: false,
        error: "airdrop is closed",
        ..._mint,
      });

    let added = await global.db.controllers.Wallet.add(
      Object.keys(global.db.controllers.Wallet.schema).map((k) => form[k])
    );

    let wallet = await global.db.controllers.Wallet.find(
      "address",
      form.address
    );

    return res.json({
      success: true,
      msg: "saved",
      wallet: wallet.length > 0 ? wallet[0] : null,
      ...(await getMintStatus(req)),
    });
  } else {
    return res.status(400).json({
      success: false,
      error: "bad request",
    });
  }
});

// Retrives all wallets; requires ?token=<ADMIN_ACCESS_TOKEN>
router.get("/admin/wallets", async (req, res) => {
  if (req.query?.token && req.query.token === process.env.ADMIN_ACCESS_TOKEN) {
    let wallets = await global.db.controllers.Wallet.getAll();
    return res.json({
      success: true,
      wallets,
      ...(await getMintStatus(req, wallets.length)),
    });
  }

  return res.status(403).json({
    success: false,
    error: "invalid access token",
  });
});

// Deletes wallet/s using the wallet address; requires ?token=<ADMIN_ACCESS_TOKEN>
router.delete("/admin/wallet/:address", async (req, res) => {
  if (req.query?.token && req.query.token === process.env.ADMIN_ACCESS_TOKEN) {
    let wallets = await global.db.controllers.Wallet.find(
      "address",
      req.params.address
    );

    if (!wallets.length > 0) {
      return res.status(404).json({
        success: false,
        error: "wallet not found",
        ...(await getMintStatus(req)),
      });
    }

    let deleted = await global.db.controllers.Wallet.delete(
      "address",
      req.params.address
    );

    return res.json({
      success: true,
      msg: "deleted",
      count: wallets.length,
      ...(await getMintStatus(req)),
    });
  }

  return res.status(403).json({
    success: false,
    error: "invalid access token",
  });
});

module.exports = router;
