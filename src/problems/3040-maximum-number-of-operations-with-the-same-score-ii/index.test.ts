import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfOperationsWithTheSameScoreII as maxOperations } from ".";

/** Tries every sequence of removals. */
const byBruteForce = (nums: number[]): number => {
	const search = (arr: number[], score: number | undefined): number => {
		if (arr.length < 2) return 0;
		const options: [number, number[]][] = [
			[(arr[0] ?? 0) + (arr[1] ?? 0), arr.slice(2)],
			[(arr.at(-2) ?? 0) + (arr.at(-1) ?? 0), arr.slice(0, -2)],
			[(arr[0] ?? 0) + (arr.at(-1) ?? 0), arr.slice(1, -1)],
		];
		let best = 0;
		for (const [sum, rest] of options)
			if (score === undefined || sum === score)
				best = Math.max(best, 1 + search(rest, sum));
		return best;
	};
	return search(nums, undefined);
};

describe("3040. Maximum Number of Operations With the Same Score II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxOperations([3, 2, 1, 2, 3, 4])).toBe(3);
		expect(maxOperations([3, 2, 6, 1, 4])).toBe(2);
	});

	it("matches trying every removal on random arrays", () => {
		const random = createRandom(3040);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 10), 1, 3);
			expect(maxOperations(nums)).toBe(byBruteForce(nums));
		}
	});
});
