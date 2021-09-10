<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Doughnut } from "vue-chartjs";
import { ProgressBar } from "@/types";
import ColorHash from "color-hash";

const ch = new ColorHash();

@Component({
  extends: Doughnut, // this is important to add the functionality to your component
})
export default class ProgressBarVue extends Mixins(Doughnut) {
  @Prop()
  chart!: ProgressBar;

  mounted(): void {
    const values = this.chart.values;
    this.renderChart({
      labels: values.map((v) => v.label),
      datasets: [
        {
          label: "Doughnut chart",
          backgroundColor: values.map((v) => v.colorHex || ch.hex(v.label)),
          data: values.map((v) => v.value),
        },
      ],
    });
  }
}
</script>
