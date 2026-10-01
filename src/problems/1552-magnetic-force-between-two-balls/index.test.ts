import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { magneticForceBetweenTwoBalls as maxDistance } from ".";

/** Tries every set of m baskets. */
const byBruteForce = (position: number[], m: number): number => {
	const sorted = position.toSorted((a, b) => a - b);
	let best = 0;
	for (let mask = 0; mask < 2 ** sorted.length; mask++) {
		const chosen = sorted.filter((_, i) => mask & (1 << i));
		if (chosen.length !== m) continue;
		best = Math.max(
			best,
			Math.min(...chosen.slice(1).map((x, i) => x - (chosen[i] ?? 0))),
		);
	}
	return best;
};

describe("1552. Magnetic Force Between Two Balls", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistance([1, 2, 3, 4, 7], 3)).toBe(3);
		expect(maxDistance([5, 4, 3, 2, 1, 1000000000], 2)).toBe(999999999);
	});

	it("matches trying every placement on random inputs", () => {
		const random = createRandom(1552);
		for (let run = 0; run < 300; run++) {
			const position = [...new Set(random.array(random.int(2, 9), 1, 40))];
			if (position.length < 2) continue;
			const m = random.int(2, position.length);
			expect(maxDistance(position, m)).toBe(byBruteForce(position, m));
		}
	});
});
