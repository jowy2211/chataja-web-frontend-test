<template>
  <div v-if="data && !data.is_login" class="list-item">
    <div class="contacts">
      <div class="avatar">
        <img :src="data && data.avatar" alt="Avatar" width="40" height="40" />
      </div>
      <p class="title">{{ (data && data.name) || "-" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserComponent",
  props: {
    data: {
      type: Object,
      default: null
    }
  }
};
</script>
