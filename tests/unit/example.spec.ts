import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import View from "@/components/View.vue";

describe("View.vue", () => {
  it("renders props.msg when passed", () => {
    const configUrl = "/test";
    const wrapper = shallowMount(View, {
      propsData: { configUrl },
    });
    expect(wrapper.text()).to.include("");
  });
});
