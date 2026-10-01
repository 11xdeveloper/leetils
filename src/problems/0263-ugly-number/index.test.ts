import { describe, expect, it } from "bun:test";
import { uglyNumber } from ".";

const largestPrimeFactor = (n: number): number => {
	let rest = n;
	let largest = 1;
	for (let d = 2; d * d <= rest; d++) {
		while (rest % d === 0) {
			largest = d;
			rest /= d;
		}
	}
	return rest > 1 ? rest : largest;
};

describe("263. Ugly Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(uglyNumber(6)).toBeTrue();
		expect(uglyNumber(1)).toBeTrue();
		expect(uglyNumber(14)).toBeFalse();
	});

	it("rejects zero and negative numbers", () => {
		expect(uglyNumber(0)).toBeFalse();
		expect(uglyNumber(-6)).toBeFalse();
		expect(uglyNumber(-(2 ** 31))).toBeFalse();
	});

	it("matches checking the largest prime factor for every n up to 10,000", () => {
		for (let n = 1; n <= 10_000; n++)
			expect(uglyNumber(n)).toBe(largestPrimeFactor(n) <= 5);
	});
});
