<template>
  <main class="content column">
    <div class="row">
      <div class="col-1">
        <div class="card no-background">
          <div class="list">
            <div class="list-item">
              <img src="../assets/logo.png" width="50" height="50" />
            </div>
            <div class="list-item">
              <div
                :class="isShow ? 'icon active' : 'icon'"
                v-on:click="isShow = !isShow"
              >
                <IconMessage :size="35" />
              </div>
            </div>
            <div class="list-item position-end">
              <div class="icon power" v-on:click="doLogout">
                <IconPower :size="35" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isShow" class="col-3">
        <div class="card bordered">
          <div class="list">
            <div class="list-item">
              Chats
            </div>
            <User
              v-for="(item, i) in listUser"
              :key="`item-user-${i}`"
              :data="item"
            />
          </div>
        </div>
      </div>
      <div :class="isShow ? 'col-8' : 'col-11'">
        <div class="card bordered">
          <div class="list">
            <div class="list-item">
              <div class="header-chatroom">
                <User :data="listUser[0]" />
              </div>
            </div>
            <div class="list-item chatroom">
              <div>
                <Chat
                  v-for="(item, i) in dataChat"
                  :key="`item-chat-${i}`"
                  :data="item"
                />
              </div>
            </div>
            <div class="list-item">
              <div class="footer-chatroom">
                <input
                  v-model="message"
                  type="text"
                  class="field-chat"
                  placeholder="Type your message here..."
                />
                <div class="btn-send" v-on:click="sendMessage">
                  <IconSend :size="34" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import firebase from "firebase";

import Chat from "../components/chat";
import User from "../components/user";

import IconSend from "vue-material-design-icons/Send.vue";
import IconPower from "vue-material-design-icons/Power.vue";
import IconMessage from "vue-material-design-icons/MessageReplyText";

export default {
  name: "Chatroom",
  components: {
    Chat,
    User,
    IconSend,
    IconPower,
    IconMessage
  },
  data: () => ({
    dataChat: [
      {
        type: "sender",
        name: "Anjas",
        time: "11:00",
        text: "Hallo Apakabar ?"
      },
      {
        type: "receive",
        name: "Unjust",
        time: "11:00",
        text: "Kabar baik nih sob wkwk"
      }
    ],
    message: null,
    isShow: true
  }),
  computed: {
    listUser() {
      const res = this.$store.getters.getInitData;
      const id = this.$cookies.get("usr.id");
      return res.filter(item => item.phone !== id);
    }
  },
  beforeMount() {
    const id = this.$cookies.get("usr.id");
    const status = this.$cookies.get("usr.status");

    if (!id && !status) return this.$router.push("/");
  },
  methods: {
    sendMessage() {
      let tempChat = [...this.dataChat];
      if (this.message) {
        const date = new Date();
        const payload = {
          type: "sender",
          name: "Anjas",
          text: this.message,
          time: `${date.getHours()}:${date.getMinutes()}`
        };

        tempChat = [...tempChat, ...[payload]];
        this.message = null;

        setTimeout(() => {
          const payload = {
            type: "receive",
            name: "Unjust",
            text:
              "Download the Vue Devtools extension for a better development experience: https://github.com/vuejs/vue-devtools",
            time: `${date.getHours()}:${date.getMinutes()}`
          };
          tempChat = [...tempChat, ...[payload]];
          this.dataChat = [...tempChat];
        }, 200);
      }
      this.dataChat = [...tempChat];
    },
    async doLogout() {
      await firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("success");
        })
        .catch(function(error) {
          console.log(error);
        });
      await this.$store.dispatch("logout");
      await this.$cookies.remove("usr.id");
      await this.$cookies.remove("usr.status");

      window.location.href = "/";
    },
  }
};
</script>
