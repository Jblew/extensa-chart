<template>
  <div>extensa-chart: Would fetch config from '{{ configUrl }}' render extensa-chart</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class View extends Vue {
  @Prop()
  configUrl!: string
}
</script>
<style scoped>
div {
  background: blue;
  color:white;
  padding: 1rem;
  font-family: monospace;
}
</style>