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
  @Prop({ required: true })
  configUrl!: string;

  @Prop({ required: true, type: String })
  componentSrc!: string;

  loading = true;
  error = "";
  config?: Chart;

  get configUrlResolved(): string {
    const base = this.componentSrc
      .split("/")
      .slice(0, -1)
      .join("/");
    const separator =
      base.endsWith("/") && this.configUrl.startsWith("/") ? "" : "/";
    return `${base}${separator}${this.configUrl}`.replace(/\/\//i, "/");
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
      this.config = await fetch(this.configUrlResolved).then((resp) =>
        resp.json()
      );
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
