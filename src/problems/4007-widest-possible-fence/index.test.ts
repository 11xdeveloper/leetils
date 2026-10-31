import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { widestPossibleFence as maximumWidth } from ".";

/** Tries every target height, matching pairs by search. */
const byBruteForce = (planks: number[]): number => {
	const targets = new Set<number>(planks);
	for (let i = 0; i < planks.length; i++)
		for (let j = i + 1; j < planks.length; j++)
			targets.add((planks[i] ?? 0) + (planks[j] ?? 0));
	let best = 0;
	for (const t of targets) {
		const go = (rest: number[]): number => {
			if (rest.length === 0) return 0;
			const [first = 0, ...others] = rest;
			let value = go(others) + (first === t ? 1 : 0);
			others.forEach((x, k) => {
				if (first + x === t)
					value = Math.max(value, 1 + go(others.filter((_, j) => j !== k)));
			});
			return value;
		};
		best = Math.max(best, go(planks));
	}
	return best;
};

describe("4007. Widest Possible Fence", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumWidth([1, 3, 2, 5, 7, 5, 4, 2, 1])).toBe(4);
		expect(maximumWidth([2, 3, 7])).toBe(1);
	});

	it("matches searching every pairing on random planks", () => {
		const random = createRandom(4007);
		for (let run = 0; run < 150; run++) {
			const planks = random.array(random.int(1, 8), 1, 6);
			expect(maximumWidth(planks)).toBe(byBruteForce(planks));
		}
	});
});
