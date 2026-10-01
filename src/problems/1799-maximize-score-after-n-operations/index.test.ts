import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeScoreAfterNOperations as maxScore } from ".";

/** Tries every order of pairing. */
const byBruteForce = (nums: number[]): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const play = (left: number[], operation: number): number => {
		if (left.length === 0) return 0;
		let best = 0;
		for (let i = 0; i < left.length; i++) {
			for (let j = i + 1; j < left.length; j++) {
				const rest = left.filter((_, k) => k !== i && k !== j);
				best = Math.max(
					best,
					operation * gcd(left[i] ?? 0, left[j] ?? 0) +
						play(rest, operation + 1),
				);
			}
		}
		return best;
	};
	return play(nums, 1);
};

describe("1799. Maximize Score After N Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([1, 2])).toBe(1);
		expect(maxScore([3, 4, 6, 8])).toBe(11);
		expect(maxScore([1, 2, 3, 4, 5, 6])).toBe(14);
	});

	it("matches trying every pairing order on random inputs", () => {
		const random = createRandom(1799);
		for (let run = 0; run < 60; run++) {
			const nums = random.array(2 * random.int(1, 3), 1, 30);
			expect(maxScore(nums)).toBe(byBruteForce(nums));
		}
	});

	it("handles 14 numbers", () => {
		expect(
			maxScore(Array.from({ length: 14 }, (_, i) => (i + 1) * 6)),
		).toBeGreaterThan(0);
	});
});
