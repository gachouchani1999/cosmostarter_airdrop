const _mint = (name, address) => {
  fetch(`/api/wallet`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}&address=${encodeURIComponent(
      address
    )}`,
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) {
        $.notify(res.error, "error");
      } else {
        $.notify("Minted successfully!", "success");
      }

      if (res.threshold) {
        $("div[role=progressbar]")
          .first()
          .css("width", `${res.percentage}%`)
          .text(`${res.minted} / ${res.threshold} $CSMS `);
      }
    });
};

const updateMintingStatus = () => {
  fetch(`/api/status`)
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) {
        $.notify(res.error, "error");
      }
      "Minted successfully!", "success";

      if (res.threshold) {
        $("div[role=progressbar]")
          .first()
          .css("width", `${res.percentage}%`)
          .text(`${res.minted} / ${res.threshold} $CSMS `);
      }
    });
};

window.onload = async () => {
  updateMintingStatus();
  if (!window.keplr) {
    alert(
      "Please make sure that you have Keplr wallet installed in your browser before applying for the airdrop."
    );
  } else {
    const chainId = "cosmoshub-4";

    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether or not to allow access if they haven't visited this website.
    // Also, it will request user to unlock the wallet if the wallet is locked.
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    const accountAdd = accounts[0];
    const address = accountAdd.address;
    const addrList = "a".split(" ");
    if (addrList.includes(address) !== -1) {
      document.getElementById("inline-form-input-username").disabled = false;
      document.getElementById("sub-btn").disabled = false;
      alert("You are eligible to participate in the airdrop.");
    } else {
      alert("You are not eligible for the airdrop, please try again later.");
    }
  }
};
