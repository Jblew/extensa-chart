<template>
  <div>
    <div v-if="error" class="error">Cannot fetch Chart config: {{ error }}</div>
    <div v-else-if="loading" class="loading">
      Loading, please wait...
    </div>
    <div v-else-if="config">
      <any-chart :config="config" @refresh="refresh()" />
    </div>
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
  configUrl!: string;
  loading = true;
  error = "";
  config?: Chart;

  get configJSON(): string {
    return JSON.stringify(this.config || {}, undefined, 2);
  }

  mounted(): void {
    this.loadConfig();
  }

  refresh(): void {
    this.loadConfig();
  }

  private async loadConfig() {
    this.loading = true;
    this.error = "";
    try {
      this.config = await fetch(this.configUrl).then((resp) => resp.json());
    } catch (err) {
      this.error = `${err.message}`;
    }
    this.loading = false;
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
