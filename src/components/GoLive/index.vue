<template>
    <div class="page-container">
        <div id="q-app" style="min-height: 100vh;">
            <div class="q-pa-md example-column-row-wrapping">
                <div class="column justify-center" style="height: 250px">
                    <div class="col text-center col-md-4">
                      <h6> Live trading now</h6>
                    </div>
                    <div class="ad-container  col-auto">
                        Markets moving >> moving
                    </div>
                </div>





                <div class="column" style="height: 400px; max-height: 100%">
                    <div class="col-9 comment-container">
                        <h5> Comment Section</h5>
              
                    </div>
                    <div class="col-6 live-container">
                        <h5>live Videos</h5>
                        <!-- <div style="height:100%; width:100%;">
                            <q-video
                                :ratio="17/9"
                                src="https://www.youtube.com/embed/PDdT-rWY1AI"
                                title="🔴Live FOREX Day Trading (NAS100, US30) - Unemployment Claims"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                                style="border-radius: 20px;"
                            ></q-video>
                        </div> -->
                    </div>
                </div>

                <div class="column" style="height: 150px">
                <div class="col-3 col-sm-6 button-container">
                    <button> Mute Comment</button>
                    <button> Block Comment</button>
                    <!-- <button> Resume Live</button>
                    <button> Share live</button>
                    <button> Start live</button> -->
                </div>
                <div class="col-3 col-sm-6">
        
                </div>

                <div class="col-3 col-sm-6 button-container">
                    <button> pause Live</button>
                    <button> stop live</button>
                    <button> Resume Live</button>
                    <button> Share live</button>
                    <button> Start live</button>
                </div>
                <div class="col-3 col-sm-6"></div>
                </div>
            </div>
            </div>
    </div>
</template>
  
  <script>
  
  </script>
  
  <style scoped>
  .ad-container {
    background:rgba(0, 0, 0, 0.664);
    color:white;
  }
  .comment-container {
    height:100%;
    width:30%;
    background:grey;
  }
  .live-container {
    width:100%;
    height:60vh;
    background:blue;
  
  }

  .button-container> button {
    margin:20px;
  }
  

.example-column-row-wrapping .column > div {
  padding: 10px 15px;

  border: 1px solid rgba(153, 153, 153, 0.2);
}

  
  </style>