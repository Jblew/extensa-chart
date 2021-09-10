export type Chart = {
  chart: AnyChart;
};

export type AnyChart = PieChart | ProgressBar;

export interface PieChart {
  type: "pie";
  values: LabeledPartitionChartValue[];
}

export function pieChart(values: LabeledPartitionChartValue[]): PieChart {
  return {
    type: "pie",
    values,
  };
}

export interface ProgressBar {
  type: "progress";
  title: string;
  values: LabeledPartitionChartValue[];
}

export interface LabeledPartitionChartValue {
  colorHex?: string;
  label: string;
  value: number;
}
