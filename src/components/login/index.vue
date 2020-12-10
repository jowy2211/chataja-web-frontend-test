<template>
  <div class="row fill-height">
    <div class="col-3" style="margin: auto;">
      <div class="card">
        <div class="card-title">
          <div>
            <img src="../../assets/logo.png" width="50" height="50" />
          </div>
          <div>
            <h4>Sign in</h4>
          </div>
        </div>
        <div id="recaptcha-container"></div>
        <form :class="error ? 'errors' : ''" method="post" @submit="doSubmit">
          <div>
            <input
              v-model="fieldLogin"
              type="tel"
              :class="error ? 'input-field has-error' : 'input-field'"
              placeholder="Input your phone number"
              :disabled="submit"
              @keypress="isNumber"
            />
          </div>
          <div>
            <button type="submit" class="btn" :disabled="submit">Log In</button>
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
    error: false,
    submit: false
  }),
  watch: {
    fieldLogin() {
      this.error = false;
    }
  },
  methods: {
    doSubmit(e) {
      e.preventDefault();
      const isFilled = this.fieldLogin;

      if (isFilled) {
        this.submit = true;
        const payload = {
          username: this.convertPhoneNumber(isFilled)
        };

        this.$emit("doSubmit", payload);
      }
      this.error = true;
    },
    isNumber(event) {
      const evt = event || window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      }
      return true;
    },
    convertPhoneNumber(phone) {
      let phoneNumber = phone.toString();
      if (phoneNumber.startsWith("08")) {
        const newphone = phoneNumber.substring(1);
        phoneNumber = `+62${newphone}`;
        return phoneNumber;
      }
      if (phoneNumber.startsWith("8")) {
        phoneNumber = `+62${phoneNumber}`;
        return phoneNumber;
      }
      if (phoneNumber.startsWith("62")) {
        const newphone = phoneNumber.replace(/[^0-9\\.]+/g, "");
        const numPhone = newphone.replace("62", "+62");
        phoneNumber = numPhone;
        return phoneNumber;
      }
      return null;
    }
  }
};
</script>
