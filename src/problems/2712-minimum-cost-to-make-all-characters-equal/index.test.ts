import { describe, expect, it } from "bun:test";
import { minimumCostToMakeAllCharactersEqual as minimumCost } from ".";

describe("2712. Minimum Cost to Make All Characters Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost("0011")).toBe(2);
		expect(minimumCost("010101")).toBe(9);
	});
});
