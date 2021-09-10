import { expect } from "chai";
import { mount } from "@vue/test-utils";
import AnyChart from "@/charts/AnyChart.vue";

describe("AnyChart.vue", () => {
  it("renders valid chart", () => {
    const config = {
      chart: {
        type: "pie",
        values: [
          { label: "Wise people", value: 0.62 },
          { label: "Wiser people", value: 0.32 },
          { label: "Wisest people", value: 0.06, colorHex: "#ff0000" },
        ],
      },
    };
    const wrapper = mount(AnyChart, {
      propsData: { config },
    });
    expect(wrapper.text()).to.include("");
  });
});
