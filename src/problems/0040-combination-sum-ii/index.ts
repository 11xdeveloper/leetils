/**
 * 40. Combination Sum II
 *
 * Returns every unique combination of numbers from `candidates` that adds up
 * to `target`, using each candidate at most once. Candidates may repeat, but
 * no combination is returned twice. Each combination is in ascending order.
 *
 * Backtracks over the sorted candidates. At each depth it skips a candidate
 * equal to the one before it, which would only find the same combinations
 * again, and stops once a candidate is larger than what remains.
 *
 * @see https://leetcode.com/problems/combination-sum-ii/
 * @difficulty Medium
 * @timeComplexity O(2^n * n)
 * @spaceComplexity O(n) excluding the returned combinations
 *
 * @example
 * combinationSumII([10, 1, 2, 7, 6, 1, 5], 8); // [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
 */
export const combinationSumII = (
	candidates: readonly number[],
	target: number,
): number[][] => {
	const sorted = candidates.toSorted((a, b) => a - b);
	const combinations: number[][] = [];
	const combination: number[] = [];

	const search = (start: number, remaining: number): void => {
		if (remaining === 0) {
			combinations.push([...combination]);
			return;
		}

		for (let i = start; i < sorted.length; i++) {
			const candidate = sorted[i];
			if (candidate === undefined || candidate > remaining) break;
			if (i > start && candidate === sorted[i - 1]) continue;

			combination.push(candidate);
			search(i + 1, remaining - candidate);
			combination.pop();
		}
	};

	search(0, target);
	return combinations;
};
