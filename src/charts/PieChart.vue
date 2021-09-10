<template>
  <strong>PieChart</strong>
</template>

<script lang="ts">
import { PieChart } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class View extends Vue {
  @Prop()
  chart!: PieChart;
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
