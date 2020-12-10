import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initData: [],
    initLoginData: null
  },
  mutations: {
    SET_INIT_LOGIN_DATA(state, data) {
      const s = state;
      const temp = s.initData;

      s.initLoginData = data;
      s.initData = [...temp, ...[data]];
    },
    SET_INIT_DATA(state, data) {
      const s = state;

      s.initData = data;
    },
    SET_DEFAULT_DATA(state) {
      const s = state;
      s.initData = [];
      s.initLoginData = null;
    }
  },
  getters: {
    getInitData(state) {
      return state.initData;
    },
    getInitLoginData(state) {
      return state.initLoginData;
    }
  },
  actions: {
    async requestLogin({ state, commit }, payload) {
      const initData = state.initData;
      const { username } = payload;

      const getUser = await initData.find(
        ({ phone, email }) =>
          phone.includes(username) || email.includes(username)
      );

      if (getUser) {
        commit("SET_INIT_LOGIN_DATA", getUser);
      }
    },
    async initData({ commit }) {
      const url = "http://demo1634572.mockable.io/users";

      await axios
        .get(url)
        .then(res => {
          const { status, data } = res;
          if (status === 200 && data) {
            const users = data.data;
            if (users) {
              commit("SET_INIT_DATA", users);
            }
          }
        })
        .catch(e => e);
    },
    verifyOTP({ commit }, { payload, otp }) {
      const user = {
        ...payload,
        is_login: true,
        otp
      };

      commit("SET_INIT_LOGIN_DATA", user);
    },
    async logout({ commit }) {
      commit("SET_DEFAULT_DATA");
    }
  },
  modules: {}
});
