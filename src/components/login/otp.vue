<template>
  <div class="row fill-height">
    <div class="col-3" style="margin: auto;">
      <div class="card">
        <div class="card-title">
          <div>
            <img src="../../assets/logo.png" width="50" height="50" />
          </div>
          <div>
            <h6>
              OTP has been sent to {{ (userdata && userdata.phone) || "-" }}
            </h6>
          </div>
        </div>
        <form :class="error ? 'errors' : ''" method="post" @submit="doSubmit">
          <div>
            <input
              v-model="fieldLogin"
              type="text"
              maxlength="6"
              :class="`input-field-otp ${error ? 'has-error' : ''}`"
              placeholder=" _ _ _ _ _ _ "
            />
          </div>
          <div>
            <button type="submit" class="btn">Log In</button>
            <p class="text-otp" v-on:click="doResendOTP">Resend OTP</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "LoginComponent",
  data: () => ({
    fieldLogin: null,
    error: false
  }),
  watch: {
    fieldLogin() {
      this.error = false;
    }
  },
  computed: {
    userdata() {
      return this.$store.getters.getInitLoginData;
    }
  },
  methods: {
    doSubmit(e) {
      e.preventDefault();
      const isFilled = this.fieldLogin;

      if (isFilled) {
        const payload = {
          code: isFilled
        };

        this.$emit("doVerify", payload);
      }
      this.error = true;
    },
    doResendOTP() {
      this.$emit("resend");
    }
  }
};
</script>
