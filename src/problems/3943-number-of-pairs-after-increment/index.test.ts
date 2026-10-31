import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfPairsAfterIncrement as numberOfPairs } from ".";

/** Applies each query directly. */
const byBruteForce = (
	nums1: number[],
	nums2: number[],
	queries: number[][],
): number[] => {
	const arr = [...nums2];
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0, val = 0] of queries) {
		if (kind === 1) for (let i = a; i <= b; i++) arr[i] = (arr[i] ?? 0) + val;
		else
			answers.push(
				nums1.reduce((s, x) => s + arr.filter((y) => x + y === a).length, 0),
			);
	}
	return answers;
};

describe("3943. Number of Pairs After Increment", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfPairs(
				[1, 2],
				[3, 4],
				[
					[2, 5],
					[1, 0, 0, 2],
					[2, 5],
				],
			),
		).toEqual([2, 1]);
		expect(
			numberOfPairs(
				[1, 1],
				[2, 2, 3],
				[
					[2, 4],
					[1, 0, 1, 1],
					[2, 4],
				],
			),
		).toEqual([2, 6]);
		expect(
			numberOfPairs(
				[2, 5, 8, 4],
				[1, 3, 8],
				[
					[2, 9],
					[1, 1, 2, 1],
					[2, 10],
				],
			),
		).toEqual([1, 0]);
	});

	it("matches applying queries directly on random input", () => {
		const random = createRandom(3943);
		for (let run = 0; run < 200; run++) {
			const nums1 = random.array(random.int(1, 5), 1, 5);
			const nums2 = random.array(random.int(1, 20), 1, 5);
			const queries = Array.from({ length: 15 }, () => {
				if (random.int(0, 1)) return [2, random.int(2, 14)];
				const x = random.int(0, nums2.length - 1);
				return [1, x, random.int(x, nums2.length - 1), random.int(1, 3)];
			});
			expect(numberOfPairs(nums1, nums2, queries)).toEqual(
				byBruteForce(nums1, nums2, queries),
			);
		}
	});
});
