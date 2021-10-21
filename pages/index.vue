<template>
  <div>
  <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Jane Doe"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-text">Username</label>
    <b-input-group prepend="Address" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input id="inline-form-input-username" placeholder="Ethereum Address"></b-form-input>
    </b-input-group>


    <b-button variant="primary">Submit</b-button>
  </b-form>
</div>
</template>

<script>
export default {}
</script>
