/**
 * 47. Permutations II
 *
 * Returns every distinct ordering of `nums`, which may hold repeated values,
 * in ascending lexicographic order.
 *
 * Backtracking over the sorted values. Equal values are always used in their
 * sorted order: a value is skipped while an equal value before it is still
 * unused, so each distinct ordering is built only once.
 *
 * @see https://leetcode.com/problems/permutations-ii/
 * @difficulty Medium
 * @timeComplexity O(n * n!)
 * @spaceComplexity O(n) excluding the returned orderings
 *
 * @example
 * permutationsII([1, 1, 2]); // [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
 */
export const permutationsII = (nums: readonly number[]): number[][] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const results: number[][] = [];
	const current: number[] = [];
	const used = new Array<boolean>(sorted.length).fill(false);

	const build = (): void => {
		if (current.length === sorted.length) {
			results.push([...current]);
			return;
		}

		for (const [i, num] of sorted.entries()) {
			if (used[i]) continue;
			if (i > 0 && num === sorted[i - 1] && !used[i - 1]) continue;

			used[i] = true;
			current.push(num);
			build();
			current.pop();
			used[i] = false;
		}
	};

	build();
	return results;
};
