import { describe, expect, it } from "bun:test";
import { sortEvenAndOddIndicesIndependently as sortEvenOdd } from ".";

describe("2164. Sort Even and Odd Indices Independently", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortEvenOdd([4, 1, 2, 3])).toEqual([2, 3, 4, 1]);
		expect(sortEvenOdd([2, 1])).toEqual([2, 1]);
	});
});
