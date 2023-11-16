<template>

        <div class="text-grey">
            <div class="row">

                <div class="col col-md-12 q-pa-lg ">
                    <span class="text-h3">120 University</span><br/>
                    Dreamers university. Videos and tutorials to help you learn how to trade forex.
                </div>
            </div>

                <div class="q-pa-md example-row-mix-and-match">
                    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
                    <!-- <h4 class="text-center text-blue-grey-2">title</h4> -->
                    <div class="row">
                        <div class="col col-md-8">
                            <span class="text-h5" >Description</span> <br/>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus earum doloribus sint repudiandae libero eligendi similique animi qui nam debitis.</p>
                            <q-video
                                :ratio="17/9"
                                src="https://www.youtube.com/embed/PDdT-rWY1AI"
                                title="🔴Live FOREX Day Trading (NAS100, US30) - Unemployment Claims"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                                style="border-radius: 20px;"
                            ></q-video>

                        </div>
                        <div class="col-6 col-md-4">
                            <q-toolbar class="">
                                <q-btn flat round dense>
                                    <q-icon name="menu" />
                                </q-btn>
                                <q-toolbar-title>
                                    More Videos
                                </q-toolbar-title>
                                <q-btn flat round dense>
                                    <q-icon name="more_vert" />
                                </q-btn>
                            </q-toolbar>
                            <q-video
                                v-for="(item, index) in videoList"
                                :key="index"
                                v-bind="item"
                                class="q-ma-md"
                                style="border-radius: 20px;height: 160px;"
                            />
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
        <!-- <Footer>
                <h3 class="text-center">This Footer</h3>
        </Footer> -->
</template>

<script>
export default {
    name: "dreamersUniversity",
    data(){
        return {
            videoRatio: "17/9",
            videoList: [
                {
                    src: "https://www.youtube.com/embed/2Hwbj96eArg",
                    title:"🔴Live FOREX Day Trading (NAS100, US30) - Core Retail Sales News!!!",
                    frameborder: "0",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    allowfullscreen: true
                },
                {
                    src: "https://www.youtube.com/embed/twp2riCcVPw",
                    title:"🔴Live FOREX Day Trading (NAS100, US50) - Core Retail Sales News!!!",
                    frameborder: "0",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    allowfullscreen: false
                },
                {
                    src: "https://www.youtube.com/embed/PDdT-rWY1AI",
                    title:"🔴Live FOREX Day Trading (NAS100, US60) - Core Retail Sales News!!!",
                    frameborder: "0",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                    allowfullscreen: false
                },
            ]
        }
    },

}
</script>


<style scoped>
header {
    background: rgb(0,0,94);
    background: linear-gradient(187deg, rgba(0,0,94,1) 0%, rgba(0,8,255,1) 51%, rgba(0,0,94,1) 100%);
}
.example-row-mix-and-match .row > div {
padding: 10px 15px;
/* background: rgba(153, 153, 153, 0.15); */
/* border: 1px solid rgba(153, 153, 153, 0.2); */
}
.example-row-mix-and-match .row + .row {
margin-top: 1rem;
}
footer {
    background: rgb(0,0,94);
    background: linear-gradient(187deg, rgba(0,0,94,1) 0%, rgba(0,8,255,1) 51%, rgba(0,0,94,1) 100%);
}
</style>
