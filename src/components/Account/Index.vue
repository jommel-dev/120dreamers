<template>
    <div class="container ">
        <div id="q-app" style="min-height: 100vh;">
            <div class="q-pa-md example-column-row-width">
                <div class="column text-center items-center">
                    <div class="col">
                        
                        <div class="q-pa-md q-gutter-sm">
                            <q-avatar color="primary" size="100px"  text-color="white">J</q-avatar> 
                        </div>
                        <span> Profile Img</span>
                    </div>
                    <div class="col flex flex-start">
                        <ul>
                            <li>Username:</li>
                            <li>Name:</li>
                            <li>Country:</li>
                        </ul>
                    </div>
                    <div class="col-5items-center">
                        <div id="q-app"  style="min-height: 20vh;">
                            <div class="q-pa-md" style="max-width: 100%">
                                <q-list bordered padding>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label overline>OVERLINE</q-item-label>
                                        <q-item-label>Single line item</q-item-label>
                                        <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-item-label caption>5 min ago</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced></q-separator>
                                <q-item-label header>List Header</q-item-label>

                                <q-item>
                                    <q-item-section avatar>
                                    <q-icon color="primary" name="bluetooth"></q-icon>
                                    </q-item-section>
                                    <q-item-section>List item</q-item-section>
                                    <q-item-section side>
                                    <q-item-label caption>meta</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced inset="item"></q-separator>

                                <q-item>
                                    <q-item-section top avatar>
                                    <q-avatar color="primary" text-color="white" icon="bluetooth"></q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Single line item</q-item-label>
                                    <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                                     </q-item-section>

                                    <q-item-section side top>
                                    <q-item-label caption>5 min ago</q-item-label>
                                    <q-icon name="star" color="yellow"></q-icon>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced inset="item"></q-separator>

                                <q-item>
                                    <q-item-section top avatar>
                                    <q-avatar color="primary" text-color="white" square icon="bluetooth"></q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Single line item</q-item-label>
                                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                    <q-item-label caption>meta</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced inset="item"></q-separator>

                                <q-item>
                                    <q-item-section top avatar>
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                    </q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Single line item</q-item-label>
                                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                    <q-badge label="10k"></q-badge>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced inset="item"></q-separator>

                                <q-item>
                                    <q-item-section top avatar>
                                    <q-avatar rounded>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                    </q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Single line item</q-item-label>
                                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                    <q-item-label caption>meta</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced></q-separator>

                                <q-item>
                                    <q-item-section top thumbnail class="q-ml-none">
                                    <img src="https://cdn.quasar.dev/img/mountains.jpg">
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label>Single line item</q-item-label>
                                    <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                    <q-item-label caption>meta</q-item-label>
                                    </q-item-section>
                                </q-item>
                                </q-list>
                            </div>
                            </div>
                    </div>
                    <div class="col">
                        .col
                    </div>
                </div>

                <div class="column" style="height: 250px">
                    <div class="col">
                        .col
                    </div>
                    <div class="col-8">
                        .col-8
                    </div>
                    <div class="col">
                        .col
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: "accountProfile",
data(){

}
}
</script>


<style scoped>
    .example-column-row-width .column > div {
  padding: 10px 15px;
  background: rgba(153, 153, 153, 0.15);
  border: 1px solid rgba(153, 153, 153, 0.2);
  width : 80%;
}
.example-column-row-width .column + .column {
  margin-top: 1rem;
}

.container {
    background: rgb(34,86,195);
    background: linear-gradient(0deg, rgba(34,86,195,1) 0%, rgba(69,45,253,0.49343487394957986) 100%);
}




</style>