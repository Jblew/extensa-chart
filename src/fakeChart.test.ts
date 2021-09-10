import { Chart } from "./types";
import jsf from "json-schema-faker";

let schema: any = undefined;

export async function fakeChart(): Promise<Chart | undefined> {
  if (!schema) {
    schema = await loadSchema();
  }
  try {
    const fake: any = jsf.generate(schema);
    return fake.root;
  } catch (err) {
    console.error("Error while faking chart", err);
    throw err;
  }
}

async function loadSchema(): Promise<any> {
  let out: any = {};
  out = await fetch("/schema.json").then((resp) => resp.json());
  out["type"] = "object";
  out["properties"] = { root: { $ref: "#/definitions/Chart" } };
  return out;
}
