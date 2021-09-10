<template>
  <component :is="component" :chart="chart" />
</template>

<script lang="ts">
import { Chart, AnyChart as TAnyChart } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import PieChart from "@/charts/PieChart.vue";

@Component({
  components: { PieChart },
})
export default class View extends Vue {
  @Prop()
  config!: Chart;

  components: Record<string, any> = {
    pie: "PieChart",
  };

  get configJSON(): string {
    return JSON.stringify(this.config || {}, undefined, 2);
  }

  get chart(): TAnyChart {
    return this.config.chart;
  }

  get type(): string {
    return this.chart.type;
  }

  get component(): any {
    const component = this.components[this.type];
    if (!component) {
      throw new Error(`Unknown chart type: ${this.type}`);
    }
    return component;
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
