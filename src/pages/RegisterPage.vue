<template>

<div class="bg-login">
    <q-header class="transparentGradient" >
      <q-toolbar>
        <q-toolbar-title>
          120 Dreamers Trading
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-model="tab">
        <q-route-tab to="/" name="home" label="Home" />
        <q-tab name="about" label="About" />
        <q-tab name="features" label="Features" />
        <q-tab name="pricing" label="Pricing" />
        <q-tab name="brokers" label="Broker Support" />
      </q-tabs>
    </q-header>
    <div class="q-mt-xl q-pa-xl">
      <div class="row">
        <div class="col col-md-1"></div>
        <div class="col-0 col-sm-5 rounded-left-borders xs-hide ">
          <div class="row full-width q-px-xl q-pb-xl full-height flex flex-center">
            <div class="">
              <img src="/imgs/loginChart.svg" class="q-ml-xl" style="width: 90%;" />
            </div>
          </div>
        </div>
        <q-card class="q-ma-xl">
          <div class="row">
            <!-- <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
            <div class="row full-width q-px-xl q-pb-xl full-height flex flex-center">
              <div class="">
              <div class="text-h4 text-uppercase text-white fredoka" style="min-width: 220px">Welcome!</div>
              <div class="text-white q-my-sm text-subtitle1">Enter your details to get started!
              </div>
              </div>
            </div>
            </div> -->

            <div class="col-12">
            <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
              <div class="col-12 fredoka text-subtitle1">
              <router-link class="text-primary" style="text-decoration: none" to="/">
                120 Dreamers
              </router-link>
              </div>
            </div>
            <div class="row q-pa-sm-sm q-pa-md">
              <div class="col-12">
              <q-card-section>
                <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka">
                  Registration Form</div>
                </div>
                </div>

                <q-form ref="form" class="q-gutter-md" @submit="submit">
                <q-input v-model="user.first_name" label="First Name" name="First Name" />
                <q-input v-model="user.last_name" label="Last Name" name="Last Name" />
                <q-input v-model="user.email" label="Email" name="Email" />
                <q-input v-model="user.password" label="Password" name="password" type="password" />

                <div>
                  <q-btn class="full-width fredoka" color="primary" label="Register" rounded
                  type="submit"></q-btn>

                  <div class="q-mt-lg">
                  <div class="q-mt-sm">
                    Already have an account?
                    <router-link class="text-primary" to="/login">Login</router-link>
                  </div>
                  </div>
                </div>
                </q-form>
              </q-card-section>
              </div>
            </div>
            </div>
          </div>
          </q-card>
      </div>
    </div>
  </div>
 </template>

<script setup>
import register from 'src/firebase/firebase-register'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const user = reactive({
  last_name: null,
  first_name: null,
  email: null,
  password: null
})

const form = ref(null)
const router = useRouter()
const submit = async () => {
  if (form.value.validate() && !!await register(user)) {
    router.push('/app')
  }
}
</script>

<style scoped>
.bg-login{
  height: 80vh;
  background: url('/imgs/login-bg.png') no-repeat;
  background-position: 136% 0%;
}
.transparentGradient {
  /* background: rgb(0,139,250);
  background: linear-gradient(80deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 60%); */

  background: rgb(0,139,250);
  background: linear-gradient(178deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 58%)
}

</style>
