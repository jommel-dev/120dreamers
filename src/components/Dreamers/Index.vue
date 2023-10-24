<template>
        <header class="q-ml-lg">
                    <h3>120 University</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, eligendi.</p>
        </header>
        <div class="content-container" id="q-app">
            
                <div class="q-pa-md example-row-mix-and-match">
                    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                    <h4 class="text-center text-blue-grey-2">title</h4>
                    <div class="row">
                        <div class="col col-md-8">
                            <q-video
                            :ratio="17/9"
                            src="https://www.youtube.com/embed/PDdT-rWY1AI"
                            title="🔴Live FOREX Day Trading (NAS100, US30) - Unemployment Claims" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                            
                            ></q-video>
                        </div>
                        <div class="col-6 col-md-4">
                            <h5>Discription</h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus earum doloribus sint repudiandae libero eligendi similique animi qui nam debitis.</p>
                        </div>
                    </div>

                    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
                    <h4 class="text-center">Featured Content</h4>
                    <div class="row">
                    
                        <div class="col-6 col-md-4">
                            <q-video
                            :ratio="17/9"
                            src="https://www.youtube.com/embed/2Hwbj96eArg" 
                            title="🔴Live FOREX Day Trading (NAS100, US30) - Core Retail Sales News!!!" 
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                            ></q-video>
                        </div>
                        <div class="col-6 col-md-4">
                            <q-video
                            :ratio="17/9"
                            src="https://www.youtube.com/embed/twp2riCcVPw" 
                            title="🔴Live FOREX Day Trading (NAS100, US30) - BOE Gov Bailey Speaks &amp; Prelim UoM Consumer Sentiment" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                            ></q-video>
                        </div>
                        <div class="col-6 col-md-4">
                            <q-video
                            :ratio="17/9"
                            src="https://www.youtube.com/embed/PDdT-rWY1AI"
                            title="🔴Live FOREX Day Trading (NAS100, US30) - Unemployment Claims" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                            
                            >
                            </q-video>
                        
                        </div>

                    </div>

                    <!-- Columns are always 50% wide, on mobile and desktop -->
                    <h4 class="text-center">Helpful Tutorials</h4>
                    <div class="row">
                        <div class="col-6">
                            <q-video
                            :ratio="17/9"
                            src="https://www.youtube.com/embed/PDdT-rWY1AI"
                            title="🔴Live FOREX Day Trading (NAS100, US30) - Unemployment Claims" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                            
                            ></q-video>
                        </div>
                        <div class="col-6">
                            <q-video
                            :ratio="17/9"
                            src="https://www.youtube.com/embed/PDdT-rWY1AI"
                            title="🔴Live FOREX Day Trading (NAS100, US30) - Unemployment Claims" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                            
                            ></q-video>
                        </div>
                    </div>
                </div>
        </div>
        <Footer>
                <h3 class="text-center">This Footer</h3>
        </Footer>
</template>
  
  <style scoped>
    header {
        background: rgb(0,0,94);
        background: linear-gradient(187deg, rgba(0,0,94,1) 0%, rgba(0,8,255,1) 51%, rgba(0,0,94,1) 100%);
    }
    .example-row-mix-and-match .row > div {
    padding: 10px 15px;
    background: rgba(153, 153, 153, 0.15);
    border: 1px solid rgba(153, 153, 153, 0.2);
    }
    .example-row-mix-and-match .row + .row {
    margin-top: 1rem;
    }
    .content-container {
        background-color: rgb(1, 1, 118);
        background-image: url(./Illustration-test.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    footer {
        background: rgb(0,0,94);
        background: linear-gradient(187deg, rgba(0,0,94,1) 0%, rgba(0,8,255,1) 51%, rgba(0,0,94,1) 100%);
    }
    
  </style>