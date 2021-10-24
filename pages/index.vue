<template>
<div  style=" background-image: url('https://www.linkpicture.com/q/background_2.jpg'); background-repeat: no-repeat;background-size: cover;height: 100%;background-position: center;">
  
   <div>
  
  <b-navbar fixed>
    <b-navbar-brand  href="/">
      <div>
        <img src="../static/cosmostarter_logo.png" height="100rem">
      </div>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <a href="https://t.me/cosmostarterio" target="_blank"><img src="../static/telegram-logo.png" height="70rem"></a>
      <a href="https://twitter.com/cosmostarterio" target="_blank"><img src="../static/twitter-logo.png" height="80rem"></a>
    </b-navbar-nav>
  </b-navbar>
</div>
<div>
<div style="margin: 80px;" >
<b-card-group deck align='center' style="max-height:30%">
    <b-card title="Step 1" img-src="../static/astro_cosmostarter.png" img-alt="Image" img-top>
      <b-card-text>
        Make sure that you have Keplr Wallet installed as an extension on your browser and that you unlock the wallet that you have staked ATOM tokens with.
      </b-card-text>
      
     
    </b-card>

    <b-card title="Step 2" img-src="../static/cosmostarter.png" img-alt="Image" img-top>
      <b-card-text>
        Fill in your name and Ethereum wallet address to recieve ERC20 CSMS tokens.
      </b-card-text>

    </b-card>

    <b-card title="Step 3" img-src="../static/cosmostarter_flying.jpg" img-alt="Image" img-top img-height='47%'>
      <b-card-text>
        Make sure that your ETH wallet address is inputted correctly since each Keplr delegator address will have only one submission.
      </b-card-text>
      
    </b-card>
  </b-card-group>
</div>

<div class="text-center my-3" style="margin:30%">
  
  <h5>Tokens remaining for Airdrop</h5>
    <b-progress :max="max" height="2rem">
      <b-progress-bar :value="value">
        <span><strong>{{ value }} / {{ max }} $CSMS </strong></span>
      </b-progress-bar>
    </b-progress>
  <h1>  </h1>
  <b-form @submit="onSubmit" @submit.stop.prevent>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-form-input
      id="inline-form-input-name"
      v-model="form.name"
      class="mb-2 mr-sm-2 mb-sm-0"
      
      placeholder="Enter your name"
     
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-text">Username</label>
    <b-input-group prepend="Address" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input id="inline-form-input-username" v-model="form.address" required  placeholder="Ethereum Address" disabled></b-form-input>
      <b-form-invalid-feedback :state="validation">
        Your Ethereum wallet is invalid.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
    </b-input-group>

    <br>  
    <b-button v-b-popover.hover.top="'Make sure your ETH wallet is valid!'" variant="primary" >Submit</b-button>
  </b-form>
  <br>
</div>
</div>
</div>

  
</template>

<script>
const Web3 = require('web3');
export default {
  data() {
      return {
        slide: 0,
        sliding: null,
        value: 432000,
        max: 1000000,
        form: {
          name: '',
          address: '',

        }
      }
    },

    computed: {
      validation() {
        
        return Web3.utils.isAddress('this.form.address');

    }
      },

    mounted () {
    window.onload = async () => {
    if (!window.keplr) {
        alert("Please make sure that you have Keplr wallet installed in your browser before applying for the airdrop.");
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
      },
      onSubmit(event) {
        
      },
    },
  
}
  
</script>
