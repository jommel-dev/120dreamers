<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container class="bg-auth bg-custom-blue" style="height: 100vh;">
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>

export default {
    name: '',
    date(){
        return {
            thumbStyle: {
                right: '4px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            },

            barStyle: {
                right: '2px',
                borderRadius: '9px',
                backgroundColor: '#027be3',
                width: '9px',
                opacity: 0.2
            }
        }
    }
}
</script>


<style scoped>
  .wave {
      position: fixed;
      height: 100%;
      left: 0;
      bottom: 0;
      z-index: 0;
  }

  .login-image {
      z-index: 1;
  }

  .bg-auth {
      background-color: #F0F4F3;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
  }

  .bg-custom-blue{
    background: #02186b;
    }
</style>
