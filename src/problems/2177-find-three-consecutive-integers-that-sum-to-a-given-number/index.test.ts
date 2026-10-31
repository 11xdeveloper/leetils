import { describe, expect, it } from "bun:test";
import { findThreeConsecutiveIntegersThatSumToAGivenNumber as sumOfThree } from ".";

describe("2177. Find Three Consecutive Integers That Sum to a Given Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfThree(33)).toEqual([10, 11, 12]);
		expect(sumOfThree(4)).toEqual([]);
	});

	it("handles zero and large numbers", () => {
		expect(sumOfThree(0)).toEqual([-1, 0, 1]);
		expect(sumOfThree(999_999_999_999_999)).toEqual([
			333_333_333_333_332, 333_333_333_333_333, 333_333_333_333_334,
		]);
	});
});
