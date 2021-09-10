<template>
  <component :is="component" :chart="chart" @refresh="$emit('refresh')" />
</template>

<script lang="ts">
import { Chart, AnyChart as TAnyChart } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import PieChart from "@/charts/PieChart.vue";
import ProgressBar from "@/charts/ProgressBar.vue";

@Component({
  components: { PieChart, ProgressBar },
})
export default class View extends Vue {
  @Prop()
  config!: Chart;

  components: Record<string, any> = {
    pie: "PieChart",
    progress: "ProgressBar",
  };

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
