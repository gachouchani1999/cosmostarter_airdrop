<template>

  <div>
   <div>
  
  <b-navbar variant="faded" type="light" style="background-color: #0000FF">
    <b-navbar-brand href="/">
      <img src="../static/cosmostarter.png" class="d-inline-block align-top" alt="Cosmostarter Airdrop" width="50" height="50">
      Cosmostarter Airdrop
    </b-navbar-brand>
  </b-navbar>
</div>
<div class="mt-4">
    <h4>How to apply to Cosmostarter Airdrop?</h4>
    <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        The Cosmostarter Airdrop rewards ATOM validators and delegators that are helping the Cosmos community remain secure and active. Cosmostarter has decided to reward those amazing people with their ERC20 CSMS tokens.
      </b-card-text>
    </b-card>

    <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-right>
      <b-card-text>
        Some quick example text to build on the card and make up the bulk of the card's content.
      </b-card-text>
    </b-card>
  </div>


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
export default {
  data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    mounted () {
    window.onload = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
        const chainId = "cosmoshub-4";

        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);
        document.getElementById("inline-form-input-username").disabled = false;
    
        
    }
}

  },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
  
}
  
</script>
