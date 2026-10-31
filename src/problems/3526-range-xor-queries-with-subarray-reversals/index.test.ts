import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { rangeXorQueriesWithSubarrayReversals as getResults } from ".";

/** Applies the queries to a plain array. */
const byBruteForce = (nums: number[], queries: number[][]): number[] => {
	const arr = [...nums];
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0] of queries)
		if (type === 1) arr[a] = b;
		else if (type === 2)
			answers.push(arr.slice(a, b + 1).reduce((x, y) => x ^ y, 0));
		else arr.splice(a, b - a + 1, ...arr.slice(a, b + 1).reverse());
	return answers;
};

describe("3526. Range XOR Queries with Subarray Reversals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getResults(
				[1, 2, 3, 4, 5],
				[
					[2, 1, 3],
					[1, 2, 10],
					[3, 0, 4],
					[2, 0, 4],
				],
			),
		).toEqual([5, 8]);
		expect(
			getResults(
				[7, 8, 9],
				[
					[1, 0, 3],
					[2, 0, 2],
					[3, 1, 2],
				],
			),
		).toEqual([2]);
	});

	it("matches a plain array on random queries", () => {
		const random = createRandom(3526);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 31);
			const queries = Array.from({ length: random.int(1, 12) }, () => {
				const type = random.int(1, 3);
				if (type === 1)
					return [1, random.int(0, nums.length - 1), random.int(0, 31)];
				const l = random.int(0, nums.length - 1);
				return [type, l, random.int(l, nums.length - 1)];
			});
			expect(getResults(nums, queries)).toEqual(byBruteForce(nums, queries));
		}
	});
});
