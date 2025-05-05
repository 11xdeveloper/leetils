import { describe, expect, it } from "bun:test";
import { twoSum } from "./index";

describe("twoSum", () => {
	it("should find basic pairs that sum to target", () => {
		expect(twoSum([2, 7, 11, 15], 9).sort()).toEqual([0, 1].sort());
		expect(twoSum([3, 2, 4], 6).sort()).toEqual([1, 2].sort());
		expect(twoSum([3, 3], 6).sort()).toEqual([0, 1].sort());
	});

	it("should handle arrays with negative numbers", () => {
		expect(twoSum([-1, -2, -3, -4], -7).sort()).toEqual([2, 3].sort());
		expect(twoSum([-3, 4, 3, 90], 0).sort()).toEqual([0, 2].sort());
	});

	it("should handle arrays with duplicate numbers", () => {
		expect(twoSum([1, 1, 1, 1], 2).sort()).toEqual([0, 1].sort());
		expect(twoSum([2, 2, 2, 2], 4).sort()).toEqual([0, 1].sort());
	});

	it("should handle arrays with large numbers", () => {
		expect(twoSum([1000000, 2000000, 3000000], 3000000).sort()).toEqual(
			[0, 1].sort(),
		);
	});

	it("should handle arrays with zero", () => {
		expect(twoSum([0, 4, 3, 0], 0).sort()).toEqual([0, 3].sort());
		expect(twoSum([0, 0, 0, 0], 0).sort()).toEqual([0, 1].sort());
	});

	it("should handle arrays with target at the end", () => {
		expect(twoSum([1, 2, 3, 4, 5], 9).sort()).toEqual([3, 4].sort());
		expect(twoSum([1, 2, 3, 4, 5], 8).sort()).toEqual([2, 4].sort());
	});

	it("should handle arrays with target at the beginning", () => {
		expect(twoSum([1, 2, 3, 4, 5], 3).sort()).toEqual([0, 1].sort());
		expect(twoSum([1, 2, 3, 4, 5], 4).sort()).toEqual([0, 2].sort());
	});
});
