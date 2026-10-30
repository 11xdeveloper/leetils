import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeTheMaximumOfTwoArrays as minimizeSet } from ".";

/** Greedily hands out integers, giving each to the array only it can use first. */
const byBruteForce = (
	d1: number,
	d2: number,
	c1: number,
	c2: number,
): number => {
	let need1 = c1;
	let need2 = c2;
	let either = 0;
	for (let x = 1; ; x++) {
		const fits1 = x % d1 !== 0;
		const fits2 = x % d2 !== 0;
		if (fits1 && !fits2) need1--;
		else if (fits2 && !fits1) need2--;
		else if (fits1 && fits2) either++;
		if (Math.max(need1, 0) + Math.max(need2, 0) <= either) return x;
	}
};

describe("2513. Minimize the Maximum of Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeSet(2, 7, 1, 3)).toBe(4);
		expect(minimizeSet(3, 5, 2, 1)).toBe(3);
		expect(minimizeSet(2, 4, 8, 2)).toBe(15);
	});

	it("matches handing out integers one at a time on random inputs", () => {
		const random = createRandom(2513);
		for (let run = 0; run < 300; run++) {
			const d1 = random.int(2, 8);
			const d2 = random.int(2, 8);
			const c1 = random.int(1, 12);
			const c2 = random.int(1, 12);
			expect(minimizeSet(d1, d2, c1, c2)).toBe(byBruteForce(d1, d2, c1, c2));
		}
	});
});
