<template>
  <div>
    <extensa-chart-view config-url="/demo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExtensaChartView from "./components/View.vue";

@Component({
  components: {
    ExtensaChartView,
  },
})
export default class App extends Vue {}
</script>

<style></style>
