import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreAfterBinarySwaps as maximumScore } from ".";

/** Searches every reachable string. */
const byBruteForce = (nums: number[], s: string): number => {
	const seen = new Set([s]);
	const queue = [s];
	let best = 0;
	for (let q = 0; q < queue.length; q++) {
		const t = queue[q] ?? "";
		best = Math.max(
			best,
			nums.reduce((sum, x, i) => (t[i] === "1" ? sum + x : sum), 0),
		);
		for (let i = 0; i + 1 < t.length; i++)
			if (t[i] === "0" && t[i + 1] === "1") {
				const next = `${t.slice(0, i)}10${t.slice(i + 2)}`;
				if (!seen.has(next)) {
					seen.add(next);
					queue.push(next);
				}
			}
	}
	return best;
};

describe("3781. Maximum Score After Binary Swaps", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumScore([2, 1, 5, 2, 3], "01010")).toBe(7);
		expect(maximumScore([4, 7, 2, 9], "0000")).toBe(0);
	});

	it("matches searching every swap on random input", () => {
		const random = createRandom(3781);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 9);
			const nums = random.array(n, 1, 10);
			const s = random.string(n, "01");
			expect(maximumScore(nums, s)).toBe(byBruteForce(nums, s));
		}
	});
});
