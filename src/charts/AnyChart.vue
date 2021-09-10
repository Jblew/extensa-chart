<template>
  <div>
    <code>{{ configJSON }}</code>
  </div>
</template>

<script lang="ts">
import { Chart } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";
import AnyChart from "@/charts/AnyChart.vue";

@Component({
  components: { AnyChart },
})
export default class View extends Vue {
  @Prop()
  config?: Chart;

  get configJSON(): string {
    return JSON.stringify(this.config || {}, undefined, 2);
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
