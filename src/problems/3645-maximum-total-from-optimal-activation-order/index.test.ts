import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalFromOptimalActivationOrder as maxTotal } from ".";

/** Tries every activation order. */
const byBruteForce = (value: number[], limit: number[]): number => {
	const n = value.length;
	let best = 0;
	const go = (
		used: number,
		dead: number,
		active: number,
		total: number,
	): void => {
		best = Math.max(best, total);
		for (let i = 0; i < n; i++) {
			if ((used | dead) & (1 << i) || active >= (limit[i] ?? 0)) continue;
			const x = active + 1;
			let newDead = dead;
			let newActive = x;
			for (let j = 0; j < n; j++)
				if ((limit[j] ?? 0) <= x && !(newDead & (1 << j))) {
					if ((used | (1 << i)) & (1 << j)) newActive--;
					newDead |= 1 << j;
				}
			go(used | (1 << i), newDead, newActive, total + (value[i] ?? 0));
		}
	};
	go(0, 0, 0, 0);
	return best;
};

describe("3645. Maximum Total from Optimal Activation Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTotal([3, 5, 8], [2, 1, 3])).toBe(16);
		expect(maxTotal([4, 2, 6], [1, 1, 1])).toBe(6);
		expect(maxTotal([4, 1, 5, 2], [3, 3, 2, 3])).toBe(12);
	});

	it("matches trying every order on random elements", () => {
		const random = createRandom(3645);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 6);
			const value = random.array(n, 1, 9);
			const limit = random.array(n, 1, n);
			expect(maxTotal(value, limit)).toBe(byBruteForce(value, limit));
		}
	});
});
