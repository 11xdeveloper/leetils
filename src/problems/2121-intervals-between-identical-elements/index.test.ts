import { describe, expect, it } from "bun:test";
import { intervalsBetweenIdenticalElements as getDistances } from ".";

describe("2121. Intervals Between Identical Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(getDistances([2, 1, 3, 1, 2, 3, 3])).toEqual([4, 2, 7, 2, 4, 4, 5]);
		expect(getDistances([10, 5, 10, 10])).toEqual([5, 0, 3, 4]);
	});
});
