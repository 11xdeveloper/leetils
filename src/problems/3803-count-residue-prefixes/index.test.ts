import { describe, expect, it } from "bun:test";
import { countResiduePrefixes as residuePrefixes } from ".";

describe("3803. Count Residue Prefixes", () => {
	it("solves the examples from the problem statement", () => {
		expect(residuePrefixes("abc")).toBe(2);
		expect(residuePrefixes("dd")).toBe(1);
		expect(residuePrefixes("bob")).toBe(2);
	});
});
