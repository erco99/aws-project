<script>
export default {
  props: {
    text: { type: String, required: true },
    disabled: Boolean,
  },
};
</script>

<template>
  <div role="button" :class="disabled ? 'disabled' : 'enabled'">
    {{ text }}
  </div>
</template>

<style scoped>
div {
  border-radius: 3%;
  margin: 0.4px;
  width: 75px;
  height: 50px;
  text-align: center;
}
.enabled {
  padding-top: 10px;
  background-color: #8bc34a;
}
.disabled {
  padding-top: 4px;
  font-size: small;
  background-color: #e53935;
  color: #eeeeee;
  pointer-events: none;
}
</style>
