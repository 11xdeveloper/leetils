import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ipo as findMaximizedCapital } from ".";

/** Tries every order of up to k affordable projects. */
const byBruteForce = (
	k: number,
	w: number,
	profits: number[],
	capital: number[],
): number => {
	const search = (left: number, money: number, used: number): number => {
		let best = money;
		if (left === 0) return best;
		for (const [i, profit] of profits.entries()) {
			if (!(used & (1 << i)) && (capital[i] ?? 0) <= money)
				best = Math.max(
					best,
					search(left - 1, money + profit, used | (1 << i)),
				);
		}
		return best;
	};
	return search(k, w, 0);
};

describe("502. IPO", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1])).toBe(4);
		expect(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 2])).toBe(6);
	});

	it("stops when nothing is affordable", () => {
		expect(findMaximizedCapital(3, 0, [5], [1])).toBe(0);
	});

	it("matches trying every order on random inputs", () => {
		const random = createRandom(502);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const profits = random.array(n, 0, 5);
			const capital = random.array(n, 0, 6);
			const k = random.int(1, 4);
			const w = random.int(0, 3);
			expect(findMaximizedCapital(k, w, profits, capital)).toBe(
				byBruteForce(k, w, profits, capital),
			);
		}
	});
});
