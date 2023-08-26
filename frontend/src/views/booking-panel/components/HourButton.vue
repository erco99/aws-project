<script>
export default {
  props: {
    text: { type: Array, required: true },
    disabled: Boolean,
    day: String,
  },
  computed: {
    computedClass() {
      if (this.isPlayable) {
        switch (this.$store.getters.userRole) {
          case "admin":
            return (this.disabled ? "disabled" : "enabled") + " button";
          default:
            return (
                (this.disabled ? "disabled unclickable" : "enabled") + " button"
            );
        }
      } else {
        return "unplayable unclickable" + " button";
      }
    },
    isPlayable() {
      const today = new Date();
      if (this.day === today.toISOString().split("T")[0]) {
        const [ hours, minutes ] = this.text[1].split(":");
        const delta = parseInt(hours) - today.getHours();
        if (delta === 0) {
          return (parseInt(minutes) - today.getMinutes()) > 0
        } else {
          return delta > 0;
        }
      } else {
        return true;
      }
    }
  }
};
</script>

<template>
  <div role="button" :class="computedClass">
    <div class="inner">
           <p class="font-weight-bold">
              {{ text[0] }}
      </p>
    </div>
    <div class="inner">{{ text[1] }}</div>
    <div class="inner">{{ text[2] }}</div>
    <div class="inner">{{ text[3] }}</div>
  </div>
</template>

<style scoped>
.inner {
  height: 30%;
}
.button {
  border-radius: 3%;
  margin-right: 1px;
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
}

.unplayable {
  background-color: #61616f;
  color: #eeeeee;
}

.unclickable {
  pointer-events: none;
}
</style>
