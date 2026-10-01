import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToConnectSticks as connectSticks } from ".";

/** Tries joining every pair at every step. */
const byBruteForce = (sticks: number[]): number => {
	if (sticks.length <= 1) return 0;
	let best = Infinity;
	for (let i = 0; i < sticks.length; i++) {
		for (let j = i + 1; j < sticks.length; j++) {
			const joined = (sticks[i] ?? 0) + (sticks[j] ?? 0);
			const rest = sticks.filter((_, k) => k !== i && k !== j);
			best = Math.min(best, joined + byBruteForce([...rest, joined]));
		}
	}
	return best;
};

describe("1167. Minimum Cost to Connect Sticks", () => {
	it("solves the examples from the problem statement", () => {
		expect(connectSticks([2, 4, 3])).toBe(14);
		expect(connectSticks([1, 8, 3, 5])).toBe(30);
		expect(connectSticks([5])).toBe(0);
	});

	it("matches trying every order of joins on random inputs", () => {
		const random = createRandom(1167);
		for (let run = 0; run < 200; run++) {
			const sticks = random.array(random.int(1, 6), 1, 20);
			expect(connectSticks(sticks)).toBe(byBruteForce(sticks));
		}
	});
});
