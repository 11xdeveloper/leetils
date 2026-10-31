import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSubarraysAfterRemovingOneConflictingPair as maxSubarrays } from ".";

/** Removes each pair and checks every subarray. */
const byBruteForce = (n: number, pairs: number[][]): number => {
	let best = 0;
	pairs.forEach((_, removed) => {
		const rest = pairs.filter((_, i) => i !== removed);
		let count = 0;
		for (let l = 1; l <= n; l++)
			for (let r = l; r <= n; r++)
				if (
					rest.every(
						([a = 0, b = 0]) => !(a >= l && a <= r && b >= l && b <= r),
					)
				)
					count++;
		best = Math.max(best, count);
	});
	return best;
};

describe("3480. Maximize Subarrays After Removing One Conflicting Pair", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSubarrays(4, [
				[2, 3],
				[1, 4],
			]),
		).toBe(9);
		expect(
			maxSubarrays(5, [
				[1, 2],
				[2, 5],
				[3, 5],
			]),
		).toBe(12);
	});

	it("matches checking every removal on random pairs", () => {
		const random = createRandom(3480);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 8);
			const pairs = Array.from({ length: random.int(1, 5) }, () => {
				const a = random.int(1, n);
				let b = random.int(1, n);
				while (b === a) b = random.int(1, n);
				return [a, b];
			});
			expect(maxSubarrays(n, pairs)).toBe(byBruteForce(n, pairs));
		}
	});
});
