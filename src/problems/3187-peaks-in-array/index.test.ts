import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { peaksInArray as countOfPeaks } from ".";

/** Counts peaks directly for every query. */
const byBruteForce = (nums: number[], queries: number[][]): number[] => {
	const values = [...nums];
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0] of queries)
		if (type === 1) {
			let count = 0;
			for (let i = a + 1; i < b; i++)
				if (
					(values[i] ?? 0) > (values[i - 1] ?? 0) &&
					(values[i] ?? 0) > (values[i + 1] ?? 0)
				)
					count++;
			answers.push(count);
		} else values[a] = b;
	return answers;
};

describe("3187. Peaks in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countOfPeaks(
				[3, 1, 4, 2, 5],
				[
					[2, 3, 4],
					[1, 0, 4],
				],
			),
		).toEqual([0]);
		expect(
			countOfPeaks(
				[4, 1, 4, 2, 1, 5],
				[
					[2, 2, 4],
					[1, 0, 2],
					[1, 0, 4],
				],
			),
		).toEqual([0, 1]);
	});

	it("matches counting directly on random queries", () => {
		const random = createRandom(3187);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(3, 10), 1, 5);
			const queries = Array.from({ length: random.int(1, 8) }, () => {
				if (random.int(0, 1) === 0) {
					const l = random.int(0, nums.length - 1);
					return [1, l, random.int(l, nums.length - 1)];
				}
				return [2, random.int(0, nums.length - 1), random.int(1, 5)];
			});
			expect(countOfPeaks(nums, queries)).toEqual(byBruteForce(nums, queries));
		}
	});
});
