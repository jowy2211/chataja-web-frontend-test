<template>
  <div class="chats">
    <div :class="data.type">
      <div class="text">
        <p>
          {{ data.text }}
        </p>
      </div>
      <div class="time">
        {{ data.time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentChat",
  props: {
    data: {
      type: Object,
      default: null
    }
  }
};
</script>
