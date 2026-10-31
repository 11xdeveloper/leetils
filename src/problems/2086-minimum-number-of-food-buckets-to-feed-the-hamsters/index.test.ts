import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfFoodBucketsToFeedTheHamsters as minimumBuckets } from ".";

/** Tries every set of bucket spots. */
const byBruteForce = (hamsters: string): number => {
	let best = Infinity;
	for (let mask = 0; mask < 1 << hamsters.length; mask++) {
		const has = (i: number): boolean => i >= 0 && (mask & (1 << i)) !== 0;
		const valid = [...hamsters].every((char, i) =>
			char === "H" ? !has(i) && (has(i - 1) || has(i + 1)) : true,
		);
		if (!valid) continue;
		let count = 0;
		for (let bits = mask; bits; bits &= bits - 1) count++;
		best = Math.min(best, count);
	}
	return best === Infinity ? -1 : best;
};

describe("2086. Minimum Number of Food Buckets to Feed the Hamsters", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumBuckets("H..H")).toBe(2);
		expect(minimumBuckets(".H.H.")).toBe(1);
		expect(minimumBuckets(".HHH.")).toBe(-1);
	});

	it("matches trying every placement on random rows", () => {
		const random = createRandom(2086);
		for (let run = 0; run < 300; run++) {
			const hamsters = random.string(random.int(1, 12), "H.");
			expect(minimumBuckets(hamsters)).toBe(byBruteForce(hamsters));
		}
	});
});
