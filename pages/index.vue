<template>
  <div>
  <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Enter your name"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-text">Username</label>
    <b-input-group prepend="Address" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input id="inline-form-input-username" placeholder="Ethereum Address" disabled></b-form-input>
    </b-input-group>


    <b-button variant="primary">Submit</b-button>
  </b-form>
</div>
</template>

<script>
function EnableTxt() {
       document.getElementById("inline-form-input-username").removeAttribute("disabled");
   }

window.onload = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        EnableTxt()
        const chainId = "cosmoshub-4";

        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);
    
        
    
        
        
    }
}

export default {
  
}
</script>
