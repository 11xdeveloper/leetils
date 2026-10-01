import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToCutAStick as minCost } from ".";

/** Tries every order of cuts. */
const byBruteForce = (n: number, cuts: number[]): number => {
	if (cuts.length === 0) return 0;
	let best = Infinity;
	cuts.forEach((cut) => {
		const left = cuts.filter((c) => c < cut);
		const right = cuts.filter((c) => c > cut).map((c) => c - cut);
		best = Math.min(
			best,
			n + byBruteForce(cut, left) + byBruteForce(n - cut, right),
		);
	});
	return best;
};

describe("1547. Minimum Cost to Cut a Stick", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost(7, [1, 3, 4, 5])).toBe(16);
		expect(minCost(9, [5, 6, 1, 4, 2])).toBe(22);
	});

	it("matches trying every order on random sticks", () => {
		const random = createRandom(1547);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 20);
			const cuts = [
				...new Set(random.array(random.int(1, Math.min(n - 1, 6)), 1, n - 1)),
			];
			expect(minCost(n, cuts)).toBe(byBruteForce(n, cuts));
		}
	});
});
