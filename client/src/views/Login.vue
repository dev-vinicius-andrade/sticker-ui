<template>
  <div>
    <!-- <button
      class="btn btn-primary btn-block"
      v-if="!$auth.isAuthenticated"
      @click="login"
    >
      Log In
    </button> -->
    <!-- <button
      class="btn btn-primary btn-block"
      v-if="!$auth.isAuthenticated"
      @click="signup"
    >
      Sign Up
    </button> -->
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  methods: {
    login() {
      //this.$auth.loginWithRedirect();
    },
    signup() {
      // this.$auth.loginWithRedirect({
      //   screen_hint: 'signup',
      // });
    },
  },
};
</script>
