import { describe, expect, it } from "bun:test";
import { combinationSum } from "./index";

describe("combinationSum", () => {
	it("should find basic combinations", () => {
		expect(combinationSum([2, 3, 6, 7], 7).sort()).toEqual(
			[[2, 2, 3], [7]].sort(),
		);
		expect(combinationSum([2, 3, 5], 8).sort()).toEqual(
			[
				[2, 2, 2, 2],
				[2, 3, 3],
				[3, 5],
			].sort(),
		);
	});

	it("should handle when no combinations exist", () => {
		expect(combinationSum([2], 1)).toEqual([]);
		expect(combinationSum([5], 3)).toEqual([]);
	});

	it("should handle single element arrays", () => {
		expect(combinationSum([1], 2)).toEqual([[1, 1]]);
		expect(combinationSum([2], 4)).toEqual([[2, 2]]);
	});

	it("should handle arrays with single possible combination", () => {
		expect(combinationSum([3], 6)).toEqual([[3, 3]]);
		expect(combinationSum([4], 8)).toEqual([[4, 4]]);
	});

	it("should handle multiple combinations with same number", () => {
		expect(combinationSum([2], 6).sort()).toEqual([[2, 2, 2]].sort());
		expect(combinationSum([1], 4).sort()).toEqual([[1, 1, 1, 1]].sort());
	});
});
