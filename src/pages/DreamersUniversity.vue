<template>
  <div class="content-container">
      <PageContent />
  </div>
</template>
  
<script>
  import PageContent from 'src/components/Dreamers/Index.vue'
  
  export default{
    name: 'DreamersUniversity',
    components: {
        PageContent
    }
  }
</script>

<style scoped>
  .content-container {
    background-color: rgb(1, 1, 118);
    background-image: url(/imgs/Illustration-test.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    /* opacity: 0.5; */
  }
  .content-container:before {
    background-color: rgb(1, 1, 118);
    background-image: url(/imgs/Illustration-test.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.5;
  }
</style>