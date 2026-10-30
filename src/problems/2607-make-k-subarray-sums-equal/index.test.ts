import { describe, expect, it } from "bun:test";
import { makeKSubarraySumsEqual as makeSubKSumEqual } from ".";

describe("2607. Make K-Subarray Sums Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeSubKSumEqual([1, 4, 1, 3], 2)).toBe(1);
		expect(makeSubKSumEqual([2, 5, 5, 7], 3)).toBe(5);
	});
});
