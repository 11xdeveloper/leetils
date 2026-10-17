import { describe, expect, it } from "bun:test";
import { finding3DigitEvenNumbers as findEvenNumbers } from ".";

describe("2094. Finding 3-Digit Even Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(findEvenNumbers([2, 1, 3, 0])).toEqual([
			102, 120, 130, 132, 210, 230, 302, 310, 312, 320,
		]);
		expect(findEvenNumbers([2, 2, 8, 8, 2])).toEqual([
			222, 228, 282, 288, 822, 828, 882,
		]);
		expect(findEvenNumbers([3, 7, 5])).toEqual([]);
	});
});
