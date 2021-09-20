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
export default class ExtensaChartView extends Vue {
  @Prop({ required: true })
  configUrl!: string;

  @Prop({ required: true, type: String })
  componentBaseUrl!: string;

  loading = true;
  error = "";
  config?: Chart;

  resolveConfigURL(): string {
    const configUrlSanitized = this.configUrl.substring(
      this.configUrl.startsWith("/") ? 1 : 0
    );
    return `${this.componentBaseUrl}/backend/${configUrlSanitized}`;
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
    const resolvedConfigURL = this.resolveConfigURL();
    try {
      this.config = await fetch(resolvedConfigURL).then((resp) => resp.json());
    } catch (err) {
      console.error(
        `extensa-chart cannot load config from ${resolvedConfigURL}`,
        err
      );
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
