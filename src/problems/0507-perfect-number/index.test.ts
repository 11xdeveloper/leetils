import { describe, expect, it } from "bun:test";
import { perfectNumber as checkPerfectNumber } from ".";

describe("507. Perfect Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkPerfectNumber(28)).toBeTrue();
		expect(checkPerfectNumber(7)).toBeFalse();
		expect(checkPerfectNumber(1)).toBeFalse();
	});

	it("finds exactly the perfect numbers up to 10,000", () => {
		const perfect = Array.from({ length: 10_000 }, (_, i) => i + 1).filter(
			checkPerfectNumber,
		);
		expect(perfect).toEqual([6, 28, 496, 8128]);
	});

	it("recognises the largest perfect number within the constraints", () => {
		expect(checkPerfectNumber(33_550_336)).toBeTrue();
		expect(checkPerfectNumber(33_550_337)).toBeFalse();
		expect(checkPerfectNumber(10 ** 8)).toBeFalse();
	});
});
