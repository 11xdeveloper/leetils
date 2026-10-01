import { describe, expect, it } from "bun:test";
import { findTheKthLargestIntegerInTheArray as kthLargestNumber } from ".";

describe("1985. Find the Kth Largest Integer in the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthLargestNumber(["3", "6", "7", "10"], 4)).toBe("3");
		expect(kthLargestNumber(["2", "21", "12", "1"], 3)).toBe("2");
		expect(kthLargestNumber(["0", "0"], 2)).toBe("0");
	});

	it("compares numbers longer than doubles can hold", () => {
		expect(
			kthLargestNumber([`${"9".repeat(30)}1`, `${"9".repeat(30)}0`], 1),
		).toBe(`${"9".repeat(30)}1`);
	});
});
