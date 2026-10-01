import { describe, expect, it } from "bun:test";
import { convertIntegerToTheSumOfTwoNoZeroIntegers as getNoZeroIntegers } from ".";

const expectValid = (n: number) => {
	const [a = 0, b = 0] = getNoZeroIntegers(n);
	expect(a + b).toBe(n);
	expect(a).toBeGreaterThan(0);
	expect(b).toBeGreaterThan(0);
	expect(`${a}${b}`).not.toContain("0");
};

describe("1317. Convert Integer to the Sum of Two No-Zero Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(getNoZeroIntegers(2)).toEqual([1, 1]);
		expectValid(11);
	});

	it("works for every n up to 10^4", () => {
		for (let n = 2; n <= 10 ** 4; n++) expectValid(n);
	});
});
