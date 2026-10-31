import { describe, expect, it } from "bun:test";
import { countIndicesWithOppositeParity as countOppositeParity } from ".";

describe("3917. Count Indices With Opposite Parity", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOppositeParity([1, 2, 3, 4])).toEqual([2, 1, 1, 0]);
		expect(countOppositeParity([1])).toEqual([0]);
	});
});
