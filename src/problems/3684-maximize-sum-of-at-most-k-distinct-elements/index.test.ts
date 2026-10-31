import { describe, expect, it } from "bun:test";
import { maximizeSumOfAtMostKDistinctElements as maxKDistinct } from ".";

describe("3684. Maximize Sum of At Most K Distinct Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxKDistinct([84, 93, 100, 77, 90], 3)).toEqual([100, 93, 90]);
		expect(maxKDistinct([84, 93, 100, 77, 93], 3)).toEqual([100, 93, 84]);
		expect(maxKDistinct([1, 1, 1, 2, 2, 2], 6)).toEqual([2, 1]);
	});
});
