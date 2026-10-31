import { describe, expect, it } from "bun:test";
import { countValidPrefixes } from ".";

describe("4006. Count Valid Prefixes", () => {
	it("solves the examples from the problem statement", () => {
		expect(countValidPrefixes("00101")).toBe(3);
		expect(countValidPrefixes("101")).toBe(3);
	});
});
