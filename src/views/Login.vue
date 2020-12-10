<template>
  <div class="content">
    <component
      v-bind:is="cards ? cards.component : null"
      v-bind:ref="cards ? cards.type : null"
      v-on:doSubmit="doSubmit"
      v-on:doVerify="doVerify"
      v-on:resend="doResend"
    />
  </div>
</template>

<script>
import firebase from "../Firebase";
import Login from "../components/login";
import OTP from "../components/login/otp";

export default {
  name: "LoginPage",
  components: {
    Login,
    OTP
  },
  data: () => ({
    status: false
  }),
  computed: {
    cards() {
      const listCards = [
        {
          type: "REQ_LOGIN",
          name: "Login",
          component: Login
        },
        {
          type: "REQ_OTP",
          name: "OTP",
          component: OTP
        }
      ];

      return !this.status ? listCards[0] : listCards[1];
    }
  },
  beforeMount() {
    const id = this.$cookies.get("usr.id");
    const status = this.$cookies.get("usr.status");

    if (id && status) return this.$router.push("/home");
  },
  methods: {
    async doSubmit(payload) {
      await this.$store.dispatch("requestLogin", payload);

      const res = await this.$store.getters.getInitLoginData;

      // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      //   "recaptcha-container"
      // );

      if (res) {
        firebase.auth().settings.appVerificationDisabledForTesting = true;

        // const appVerifier = window.recaptchaVerifier;
        const appVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container"
        );
        let status = false;
        await firebase
          .auth()
          .signInWithPhoneNumber("+6282118440691", appVerifier)
          .then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
            status = true;
          })
          .catch(function(error) {
            console.log("Login error : ", error);
          });
        this.status = status;
      }
    },
    async doVerify(payload) {
      const initLogin = await this.$store.getters.getInitLoginData;
      const { code } = payload;

      await window.confirmationResult
        .confirm(code)
        .then(function(result) {
          return result.user;
        })
        .catch(function(error) {
          console.log(error);
        });

      await this.$cookies.set("usr.id", initLogin.phone);
      await this.$cookies.set("usr.status", true);

      this.$store.dispatch("verifyOTP", {
        payload: initLogin,
        otp: code
      });

      this.$router.push("/home");
    },
    doResend() {
      this.status = false;
    }
  }
};
</script>
