import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sortIntegersByThePowerValue as getKth } from ".";

/** Counts each number's steps directly. */
const byBruteForce = (lo: number, hi: number, k: number): number => {
	const power = (x: number) => {
		let steps = 0;
		for (let n = x; n !== 1; n = n % 2 === 0 ? n / 2 : 3 * n + 1) steps++;
		return steps;
	};
	const values = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
	return values.sort((a, b) => power(a) - power(b) || a - b)[k - 1] ?? lo;
};

describe("1387. Sort Integers by The Power Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(getKth(12, 15, 2)).toBe(13);
		expect(getKth(7, 11, 4)).toBe(7);
	});

	it("handles 1 and the whole range", () => {
		expect(getKth(1, 1, 1)).toBe(1);
		expect(getKth(1, 1000, 1000)).toBe(byBruteForce(1, 1000, 1000));
	});

	it("matches counting steps directly on random ranges", () => {
		const random = createRandom(1387);
		for (let run = 0; run < 200; run++) {
			const lo = random.int(1, 1000);
			const hi = random.int(lo, 1000);
			const k = random.int(1, hi - lo + 1);
			expect(getKth(lo, hi, k)).toBe(byBruteForce(lo, hi, k));
		}
	});
});
