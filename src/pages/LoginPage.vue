<template>
  <div>
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

        <div class="col col-md-3 q-pt-xl">
          <q-card>
            <q-card-section>
              <div class="q-mb-xl">
                <div class="flex justify-center">
                  <div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka">
                  Login</div>
                </div>
              </div>
              <q-form ref="form" class="q-gutter-md" @submit="submitLogin">
                <q-input
                  dense
                  v-model="email" 
                  label="Email"
                  name="Email" 
                />
                <q-input
                  dense
                  v-model="password"
                  label="Password"
                  name="password" 
                  type="password" 
                />
                <div>
                  <q-btn 
                    class="full-width fredoka" 
                    color="primary" 
                    label="Login" 
                    rounded
                    type="submit" 
                  />
                  <div class="q-mt-lg">
                    <q-separator />
                    <div class="q-mt-sm">
                      Don't have an account yet?
                      <router-link class="text-primary" to="/register">Register</router-link>
                    </div>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import login from 'src/firebase/firebase-login'

export default {
  name: 'logInPageContent',
  data(){
    return {
      tab: '',
      email: null,
      password: null
    }
  },
  methods: {
    async submitLogin(){
      let payload = {
        email: this.email,
        password: this.password,
      }
      await login(payload).then((res) => {
        console.log(res)
        this.$router.push('/dashboard')
      })
      
    }
  }
}
</script>

<style scoped>
.transparentGradient {
  /* background: rgb(0,139,250);
  background: linear-gradient(80deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 60%); */

  background: rgb(0,139,250);
  background: linear-gradient(178deg, rgba(0,139,250,1) 0%, rgba(253,187,45,0) 58%)
}

</style>