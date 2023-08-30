<script>
export default {
  props: {
    text: { type: Array, required: true },
    disabled: Boolean,
    day: String,
    time: {
      hours: { type: Number, required: true },
      minutes: { type: Number, required: true }
    }
  },
  computed: {
    computedClass() {
      switch (this.$store.getters.userRole) {
        case "admin":
          return (this.isPlayable ? this.disabled ? "disabled" : "enabled" : (this.disabled ? "disabled" :  "unplayable") + " unclickable") + " button";
        default:
          return (this.isPlayable ? this.disabled ? "disabled unclickable" : "enabled" : (this.disabled ? "disabled" :  "unplayable") + " unclickable") + " button";
      }
    },
    isPlayable() {
      const today = new Date();
      if (this.day === today.toISOString().split("T")[0]) {
        const { hours, minutes } = this.time;
        const delta = parseInt(hours) - today.getHours();
        if (delta === 0) {
          return (parseInt(minutes) - today.getMinutes()) > 0
        } else {
          return delta > 0;
        }
      } else {
        return true;
      }
    },
    innerClass() {
      console.log(this.text)
      console.log(this.text[1].match("[0-2][0-9]:[0-6][0-9]"))
      return this.text[1].match("[0-2][0-9]:[0-6][0-9]") ? "innerHour" : "innerText";
    }
  }
};
</script>

<template>
  <div role="button" :class="computedClass">
    <div :class="innerClass">
           <p class="font-weight-bold">
              {{ text[0] }}
      </p>
    </div>
    <div :class="innerClass">{{ text[1] }}</div>
    <div :class="innerClass">{{ text[2] }}</div>
    <div :class="innerClass">{{ text[3] }}</div>
  </div>
</template>

<style scoped>
.innerHour {
  height: 30%;
}

.innerText {
  height: 25%;
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
