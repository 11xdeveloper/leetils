import { describe, expect, it } from "bun:test";
import { onceTwice } from ".";

describe("3595. Once Twice", () => {
	it("solves the examples from the problem statement", () => {
		expect(onceTwice([2, 2, 3, 2, 5, 5, 5, 7, 7])).toEqual([3, 7]);
		expect(onceTwice([4, 4, 6, 4, 9, 9, 9, 6, 8])).toEqual([8, 6]);
	});

	it("handles negative values", () => {
		expect(onceTwice([-1, -2, -2])).toEqual([-1, -2]);
	});
});
