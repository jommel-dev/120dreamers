<template>
  <!-- feaures section  -->

  <div class="features">
    <q-header class="transparentGradient" >
      <q-toolbar>
        <q-toolbar-title>
          120 Dreamers Trading
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs v-model="tab">
        <q-route-tab to="/" name="home" label="Home" />
        <q-tab to="/features" name="features" label="Features" />
        <q-tab  name="about" label="About" />
        <q-tab name="pricing" label="Pricing" />
        <q-tab name="brokers" label="Broker Support" />
      </q-tabs>
    </q-header>
      <!-- main section features -->
    <div>
        <MainSection />
    </div>
    <!--2nd section -->
    <div>
      <Section1 />
    </div>
    <!--3nd section -->
    <div>
        <h1>3rd section</h1>
    </div>
  </div>
   
  </template>
  
  <script>
  import MainSection from 'src/components/Features/main/main.vue';
  import Section1 from 'src/components/Features/section1/section1.vue';

  export default {
  name: 'FeaturePage',
  components: {
    MainSection,
    Section1
  },

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