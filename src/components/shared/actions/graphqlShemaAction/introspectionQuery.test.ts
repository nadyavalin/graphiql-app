import { describe, it, expect } from "vitest";
import INTROSPECTION_QUERY from "./IntrospectionQuery";

describe("INTROSPECTION_QUERY", () => {
  it("should have a valid query structure", () => {
    expect(INTROSPECTION_QUERY).toContain("query IntrospectionQuery");
    expect(INTROSPECTION_QUERY).toContain("__schema");
    expect(INTROSPECTION_QUERY).toContain("types");
    expect(INTROSPECTION_QUERY).toContain("directives");
  });

  it("should contain required fragments", () => {
    expect(INTROSPECTION_QUERY).toContain("fragment FullType on __Type");
    expect(INTROSPECTION_QUERY).toContain("fragment InputValue on __InputValue");
    expect(INTROSPECTION_QUERY).toContain("fragment TypeRef on __Type");
  });
});
