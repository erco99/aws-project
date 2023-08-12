<template>
  <div id="page-signin-bg">
    <div class="background-image"></div>
    <div class="overlay"></div>
  </div>
</template>

<style>
#page-signin-bg {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
}

.background-image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-image: url('bg.jpg')
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: -webkit-linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.2),rgba(0,0,0,.5));
}
</style>