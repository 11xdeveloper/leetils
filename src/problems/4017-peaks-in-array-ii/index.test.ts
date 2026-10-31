import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { peaksInArrayII as countOfPeaks } from ".";

/** Applies each query directly. */
const byBruteForce = (nums: number[], queries: number[][]): number[] => {
	const arr = [...nums];
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0] of queries) {
		if (kind === 2) {
			arr[a] = b;
			continue;
		}
		let count = 0;
		for (let i = a; i <= b; i++)
			for (let j = i + 2; j <= b; j++) {
				let found = false;
				for (let k = i + 1; k < j; k++)
					if (
						(arr[k] ?? 0) > (arr[k - 1] ?? 0) &&
						(arr[k] ?? 0) > (arr[k + 1] ?? 0)
					)
						found = true;
				if (found) count++;
			}
		answers.push(count);
	}
	return answers;
};

describe("4017. Peaks in Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countOfPeaks(
				[1, 3, 2, 4],
				[
					[1, 0, 3],
					[2, 1, 1],
					[1, 0, 3],
				],
			),
		).toEqual([2, 0]);
		expect(
			countOfPeaks(
				[9, 8, 9, 8],
				[
					[1, 1, 3],
					[2, 2, 1],
					[1, 0, 2],
				],
			),
		).toEqual([1, 0]);
		expect(
			countOfPeaks(
				[3, 6, 2, 7, 1],
				[
					[1, 1, 3],
					[2, 3, 0],
					[1, 0, 4],
				],
			),
		).toEqual([0, 3]);
	});

	it("matches applying queries directly on random input", () => {
		const random = createRandom(4017);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(3, 12), 0, 5);
			const queries = Array.from({ length: 12 }, () => {
				if (random.int(0, 1))
					return [2, random.int(0, nums.length - 1), random.int(0, 5)];
				const l = random.int(0, nums.length - 2);
				return [1, l, random.int(l + 1, nums.length - 1)];
			});
			expect(countOfPeaks(nums, queries)).toEqual(byBruteForce(nums, queries));
		}
	});
});
