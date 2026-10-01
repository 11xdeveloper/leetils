import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToMakeRopeColorful as minCost } from ".";

/** Tries every set of balloons to keep. */
const byBruteForce = (colors: string, times: number[]): number => {
	let best = Infinity;
	for (let mask = 0; mask < 2 ** colors.length; mask++) {
		const kept = [...colors].filter((_, i) => mask & (1 << i)).join("");
		if (/(.)\1/.test(kept)) continue;
		best = Math.min(
			best,
			times.reduce((sum, t, i) => sum + (mask & (1 << i) ? 0 : t), 0),
		);
	}
	return best;
};

describe("1578. Minimum Time to Make Rope Colorful", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost("abaac", [1, 2, 3, 4, 5])).toBe(3);
		expect(minCost("abc", [1, 2, 3])).toBe(0);
		expect(minCost("aabaa", [1, 2, 3, 4, 1])).toBe(2);
	});

	it("matches trying every set of balloons on random inputs", () => {
		const random = createRandom(1578);
		for (let run = 0; run < 200; run++) {
			const colors = random.string(random.int(1, 10), "ab");
			const times = random.array(colors.length, 1, 9);
			expect(minCost(colors, times)).toBe(byBruteForce(colors, times));
		}
	});
});
