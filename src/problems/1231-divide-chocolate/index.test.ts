import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { divideChocolate as maximizeSweetness } from ".";

/** Tries every set of k cut positions. */
const byBruteForce = (sweetness: number[], k: number): number => {
	let best = 0;
	for (let cuts = 0; cuts < 2 ** (sweetness.length - 1); cuts++) {
		let count = 0;
		for (let rest = cuts; rest > 0; rest &= rest - 1) count++;
		if (count !== k) continue;
		let [least, current] = [Infinity, 0];
		sweetness.forEach((chunk, i) => {
			current += chunk;
			if (i === sweetness.length - 1 || cuts & (1 << i)) {
				least = Math.min(least, current);
				current = 0;
			}
		});
		best = Math.max(best, least);
	}
	return best;
};

describe("1231. Divide Chocolate", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximizeSweetness([1, 2, 3, 4, 5, 6, 7, 8, 9], 5)).toBe(6);
		expect(maximizeSweetness([5, 6, 7, 8, 9, 1, 2, 3, 4], 8)).toBe(1);
		expect(maximizeSweetness([1, 2, 2, 1, 2, 2, 1, 2, 2], 2)).toBe(5);
	});

	it("keeps the whole bar without cuts", () => {
		expect(maximizeSweetness([3, 4, 5], 0)).toBe(12);
	});

	it("matches trying every set of cuts on random inputs", () => {
		const random = createRandom(1231);
		for (let run = 0; run < 300; run++) {
			const sweetness = random.array(random.int(1, 10), 1, 10);
			const k = random.int(0, sweetness.length - 1);
			expect(maximizeSweetness(sweetness, k)).toBe(byBruteForce(sweetness, k));
		}
	});
});
