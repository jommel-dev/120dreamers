<template>
    <div>
        <div id="q-app" style="min-height: 100vh;">
            <div class="q-pa-md">
                <q-table
                grid
                :card-container-class="cardContainerClass"
                title="Live Streams"
                :rows="rows"
                :columns="columns"
                row-key="name"
                :filter="filter"
                hide-header
                v-model:pagination="pagination"
                :rows-per-page-options="rowsPerPageOptions"
                >
                <template v-slot:top-right>
                    <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search"></q-icon>
                    </template>
                    </q-input>
                </template>
                </q-table>
            </div>
            <!-- sample video placement -->
            <div>
                <h2>Live Streaming Soon</h2>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.example-masonry-table-grid {
  flex-direction: column;
  height: 700px;
}
.example-masonry-table-grid--2 > div:nth-child(2n+1) {
  order: 1;
}
.example-masonry-table-grid--2 > div:nth-child(2n) {
  order: 2;
}
.example-masonry-table-grid--2:before {
  content: "";
  flex: 1 0 100% !important;
  width: 0 !important;
  order: 1;
}
.example-masonry-table-grid--3 > div:nth-child(3n+1) {
  order: 1;
}
.example-masonry-table-grid--3 > div:nth-child(3n+2) {
  order: 2;
}
.example-masonry-table-grid--3 > div:nth-child(3n) {
  order: 3;
}
.example-masonry-table-grid--3:before, .example-masonry-table-grid--3:after {
  content: "";
  flex: 1 0 100% !important;
  width: 0 !important;
  order: 2;
}
    
</style>