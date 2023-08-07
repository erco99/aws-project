<script>
export default {
  props: {
    text: { type: Array, required: true },
    disabled: Boolean,
  },
};
</script>

<template>
  <div role="button" :class="(disabled ? 'disabled' : 'enabled') + ' button'">
    <div class="inner">{{ text[0] }}</div>
    <div class="inner">{{ text[1] }}</div>
    <div class="inner">{{ text[2] }}</div>
    <div class="inner">{{ text[3] }}</div>
  </div>
</template>

<style scoped>
.inner {
  height: 25%;
}
.button {
  border-radius: 3%;
  margin: 0.4px;
  width: 75px;
  height: 60px;
  text-align: center;
}
.enabled {
  background-color: #8bc34a;
}
.disabled {
  font-size: x-small;
  background-color: #e53935;
  color: #eeeeee;
  pointer-events: none;
}
</style>
