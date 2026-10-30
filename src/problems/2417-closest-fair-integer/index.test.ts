import { describe, expect, it } from "bun:test";
import { closestFairInteger } from ".";

const isFair = (n: number): boolean => {
	const digits = [...String(n)].map(Number);
	return 2 * digits.filter((d) => d % 2 === 0).length === digits.length;
};

describe("2417. Closest Fair Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(closestFairInteger(2)).toBe(10);
		expect(closestFairInteger(403)).toBe(1001);
	});

	it("matches scanning upwards for every n up to 5000", () => {
		let next = 0;
		for (let n = 1; n <= 5000; n++) {
			if (next < n) {
				next = n;
				while (!isFair(next)) next++;
			}
			expect(closestFairInteger(n)).toBe(next);
		}
	});

	it("jumps to the next length when needed", () => {
		expect(closestFairInteger(99_999_999)).toBe(1_000_001_111);
		expect(closestFairInteger(1_000_000_000)).toBe(1_000_001_111);
	});
});
