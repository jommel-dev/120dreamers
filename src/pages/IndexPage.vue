<template>
  <div class="bg-login">
    <q-header class="transparentGradient" >
      <q-toolbar>
        <q-toolbar-title>
          120 Dreamers Trading
        </q-toolbar-title>
        
        <q-btn flat to="/login" >Sign In</q-btn>
      </q-toolbar>
      <q-tabs v-model="tab">
        <q-route-tab to="/" name="home"  label="Home" />
        <q-route-tab to="/features" name="features" label="Features" />
        <q-route-tab  name="about" label="About" />
        <q-tab name="pricing" label="Pricing" />
        <q-tab name="brokers" label="Broker Support" />
      </q-tabs>
    </q-header>
    <div class="row" style="width: 100%;">
      <div class="col col-md-12">
        <q-parallax style="height: 89.6vh;">
          <template v-slot:media>
            <div class="ocean">
              <div class="wave"></div>
              <div class="wave"></div>
            </div>
          </template>

          <template v-slot:content="scope">
            <div
              class="absolute column items-center text-white"
              :style="{
                top: (scope.percentScrolled * 20) + '%',
                left: 0,
                right: 0
              }"
            >
              <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" style="width: 150px; height: 150px">
              <div class="text-h3 text-white text-center">Quasar Framework</div>
              <div class="text-h6 text-grey-3 text-center">
                v{{ $q.version }}
              </div> -->
              <div class="row">
                <div class="col col-md-6 col-lg-6 text-left q-pa-md">
                  <h2>Lorem Ipsum</h2>
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br>
                    Lorem Ipsum has been the industry's standard dummy text ever since the <br>
                    1500s when an unknown printer took a galley of type and scrambled it to <br> 
                    make a type specimen book. It has survived not only five centuries...
                  </span>
                  <br>
                  <br>
                  <br>
                  <q-btn unelevated rounded color="primary" label="Live Trading Now" to="/features" class="q-mt-xl" />
                </div>
                <div class="col col-md-6 col-lg-6">
                  <img class="landing-img"  src="/imgs/landing_2.png" />
                </div>
              </div>
            </div>
          </template>
        </q-parallax>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data(){
    return {
      tab: 'home'
    }
  }
})
</script>

<style scoped>
.transparentGradient {
  /* background: rgb(0,139,250);
  background: linear-gradient(80deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 60%); */

  background: rgb(0,139,250);
  background: linear-gradient(178deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 58%)
}


.bg-login{
  height: 80%;
  background: url('/imgs/bg-landing.svg') center no-repeat;
  /* background-position: 136% 0%; */
  background-size: fill;
 
}


.ocean {
  width:100%;
  position:absolute;
  bottom:-15%;
  left:0;
  background: #02186b;
}

.wave {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x; 
  /* background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%23003F7C'/%3E%3C/svg%3E"); */
  position: absolute;
  top: 0px;
  width: 6400px;
  height: 198px;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);
}

.wave:nth-of-type(2) {
  top: -10px;
  animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
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
  0%, 100% {
    transform: translate3d(0,-25px,0);
  }
  50% {
    transform: translate3d(0,5px,0);
  }
}
</style>