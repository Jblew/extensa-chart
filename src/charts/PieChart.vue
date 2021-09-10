<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Pie } from "vue-chartjs";
import { PieChart } from "@/types";
import ColorHash from "color-hash";

const ch = new ColorHash();

@Component({
  extends: Pie, // this is important to add the functionality to your component
})
export default class PieChartVue extends Mixins(Pie) {
  @Prop()
  chart!: PieChart;

  mounted(): void {
    const values = this.chart.values;
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: values.map((v) => v.label),
      datasets: [
        {
          label: "Pie chart",
          backgroundColor: values.map((v) => v.colorHex || ch.hex(v.label)),
          data: values.map((v) => v.value),
        },
      ],
    });
  }
}
</script>
