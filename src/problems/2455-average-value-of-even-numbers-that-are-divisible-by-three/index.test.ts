import { describe, expect, it } from "bun:test";
import { averageValueOfEvenNumbersThatAreDivisibleByThree as averageValue } from ".";

describe("2455. Average Value of Even Numbers That Are Divisible by Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(averageValue([1, 3, 6, 10, 12, 15])).toBe(9);
		expect(averageValue([1, 2, 4, 7, 10])).toBe(0);
	});
});
