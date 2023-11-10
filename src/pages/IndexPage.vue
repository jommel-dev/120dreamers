<template>
  <div class="bg-login">
    <q-header class="transparentGradient">
      <q-toolbar>
        <q-toolbar-title> 120 Dreamers Trading </q-toolbar-title>

        <q-btn flat to="/login">Sign In</q-btn>
      </q-toolbar>
      <q-tabs v-model="tab">
        <q-route-tab to="/" name="home" label="Home" />
        <q-route-tab to="/features" name="features" label="Features" />
        <q-route-tab name="about" label="About" />
        <q-tab name="pricing" label="Pricing" />
        <q-tab name="brokers" label="Broker Support" />
      </q-tabs>
    </q-header>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      tab: "home",
    };
  },
});
</script>

<style scoped>
.transparentGradient {
  /* background: rgb(0,139,250);
  background: linear-gradient(80deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 60%); */

  background: rgb(0, 139, 250);
  background: linear-gradient(
    178deg,
    rgba(0, 139, 250, 1) 0%,
    rgba(253, 187, 45, 0) 58%
  );
}

.bg-login {
  height: 80%;
  background: url("/imgs/bg-landing.svg") center no-repeat;
  /* background-position: 136% 0%; */
  background-size: fill;
}
.landing-img {
  height: 80%;
  width: 100%;
  box-shadow: 0px 0px 26px 12px rgba(9, 78, 255, 0.75);
  -webkit-box-shadow: 0px 0px 26px 12px rgba(9, 78, 255, 0.75);
  -moz-box-shadow: 0px 0px 26px 12px rgba(9, 78, 255, 0.75);
}

.ocean {
  width: 100%;
  position: absolute;
  bottom: -15%;
  left: 0;
  background: #02186b;
}

.wave {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)
    repeat-x;
  /* background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23003F7C'/%3E%3C/svg%3E"); */
  position: absolute;
  top: 0px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -10px;
  animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
    swell 7s ease -1.25s infinite;
  opacity: 1;
}

@keyframes wave {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
}

@keyframes swell {
  0%,
  100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
}
</style>
