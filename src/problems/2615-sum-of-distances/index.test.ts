import { describe, expect, it } from "bun:test";
import { sumOfDistances as distance } from ".";

describe("2615. Sum of Distances", () => {
	it("solves the examples from the problem statement", () => {
		expect(distance([1, 3, 1, 1, 2])).toEqual([5, 0, 3, 4, 0]);
		expect(distance([0, 5, 3])).toEqual([0, 0, 0]);
	});
});
