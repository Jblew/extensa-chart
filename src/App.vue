<template>
  <div>
    <h2>Basic charts</h2>
    <extensa-chart-view config-url="/mocks/pie.json" component-base-url="" />
    <hr />
    <extensa-chart-view
      config-url="/mocks/progress.json"
      component-base-url=""
    />
    <hr />
    <h2>Should fail fetching JSON</h2>
    <extensa-chart-view
      config-url="/mocks/nonexistent.json"
      component-base-url=""
    />
    <hr />
    <h2>Automatically faked charts</h2>
    <div v-for="(fake, i) in fakes" :key="i">
      <any-chart :config="fake" />
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExtensaChartView from "./components/View.vue";
import { Chart } from "./types";
import { fakeChart } from "./fakeChart.test";
import AnyChart from "@/charts/AnyChart.vue";
@Component({
  components: {
    ExtensaChartView,
    AnyChart,
  },
})
export default class App extends Vue {
  fakes: Chart[] = [];

  mounted() {
    this._loadFakes(10);
  }

  async _loadFakes(count: number) {
    const out: Chart[] = [];
    for (let i = 0; i < count; i++) {
      const fake = await fakeChart();
      if (fake) out.push(fake);
    }
    this.fakes = out;
  }
}
</script>

<style></style>
