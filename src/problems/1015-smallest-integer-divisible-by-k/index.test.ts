import { describe, expect, it } from "bun:test";
import { smallestIntegerDivisibleByK as smallestRepunitDivByK } from ".";

describe("1015. Smallest Integer Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestRepunitDivByK(1)).toBe(1);
		expect(smallestRepunitDivByK(2)).toBe(-1);
		expect(smallestRepunitDivByK(3)).toBe(3);
	});

	it("matches dividing repunits with BigInt for k up to 300", () => {
		for (let k = 1; k <= 300; k++) {
			let expected = -1;
			let repunit = 0n;
			for (let length = 1; length <= k; length++) {
				repunit = repunit * 10n + 1n;
				if (repunit % BigInt(k) === 0n) {
					expected = length;
					break;
				}
			}
			expect(smallestRepunitDivByK(k)).toBe(expected);
		}
	});
});
