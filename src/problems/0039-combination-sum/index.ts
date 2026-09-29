/**
 * 39. Combination Sum
 *
 * Returns every unique combination of numbers from `candidates` (distinct
 * integers, each at least 2) that adds up to `target`. A number can be used
 * any number of times. Each combination is in ascending order.
 *
 * Backtracks over the sorted candidates. Each step only considers the current
 * candidate or later ones, so no combination is found twice, and it stops as
 * soon as a candidate is larger than what remains.
 *
 * @see https://leetcode.com/problems/combination-sum/
 * @difficulty Medium
 * @timeComplexity O(n^(t/m)) where t is the target and m the smallest candidate
 * @spaceComplexity O(t/m) excluding the returned combinations
 *
 * @example
 * combinationSum([2, 3, 6, 7], 7); // [[2, 2, 3], [7]]
 */
export const combinationSum = (
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

			combination.push(candidate);
			search(i, remaining - candidate);
			combination.pop();
		}
	};

	search(0, target);
	return combinations;
};
