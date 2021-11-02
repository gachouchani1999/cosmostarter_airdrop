// (function () {
const cosmosHub = { account: null, chainId: "cosmoshub-4" };

const airdrop = (name, address) => {
  fetch(`/api/wallet`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-delegator-id": cosmosHub.account?.address || null,
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
        $.notify("Airdropped successfully!", "success");
      }

      if (res.threshold) {
        $("div[role=progressbar]")
          .first()
          .css("width", `${res.percentage}%`)
          .text(`${res.minted} / ${res.threshold} $CSMS `);
      }
    });
};

const airdrop_form = () => {
  let form = document.querySelector("form");
  let name = form.querySelector("input[name=name").value;
  let address = form.querySelector("input[name=address").value;

  if (!cosmosHub.account?.address) {
    return $.notify("You need to be a delegator (ATOM). Please try again later.", "error");
  }

  if (!name || !address) {
    $.notify("please fill all the fields.", "error");
  } else {
    airdrop(name, address);
  }
};

const updateStatus = () => {
  fetch(`/api/status`, {
    headers: { "x-delegator-id": cosmosHub.account?.address || null },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.success) {
        $.notify(res.error, "error");
      }
      if (res.threshold) {
        if (res.delegator) {
          document.getElementById(
            "inline-form-input-username"
          ).disabled = false;
          document.getElementById("sub-btn").disabled = false;
          $.notify(
            "You are eligible to participate in the airdrop since you are a delegator.",
            "success"
          );
        } else {
          $.notify(
            "You are not eligible for the airdrop, please try again later.",
            "warn"
          );
        }

        $("div[role=progressbar]")
          .first()
          .css("width", `${res.percentage}%`)
          .text(`${res.minted} / ${res.threshold} $CSMS `);
      }
    });
};

window.onload = async () => {
  if (!window.keplr) {
    $.notify(
      "Please make sure that you have Keplr wallet installed in your browser before applying for the airdrop.",
      "error"
    );
  } else {
    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether or not to allow access if they haven't visited this website.
    // Also, it will request user to unlock the wallet if the wallet is locked.
    await window.keplr.enable(cosmosHub.chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    const account = accounts[0];
    const { address } = account;
    cosmosHub.account = account;
  }
  updateStatus();
};
// })();
