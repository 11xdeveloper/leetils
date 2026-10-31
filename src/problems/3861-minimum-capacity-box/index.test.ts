import { describe, expect, it } from "bun:test";
import { minimumCapacityBox as minimumIndex } from ".";

describe("3861. Minimum Capacity Box", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumIndex([1, 5, 3, 7], 3)).toBe(2);
		expect(minimumIndex([3, 5, 4, 3], 2)).toBe(0);
		expect(minimumIndex([4], 5)).toBe(-1);
	});
});
