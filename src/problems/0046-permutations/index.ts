/**
 * 46. Permutations
 *
 * Returns every ordering of `nums`, which holds distinct values. Orderings
 * are returned in the order of their positions in `nums`: for `[1, 2, 3]`,
 * `[1, 2, 3]` comes first and `[3, 2, 1]` last.
 *
 * Backtracking: builds each ordering one position at a time from the values
 * not used yet.
 *
 * @see https://leetcode.com/problems/permutations/
 * @difficulty Medium
 * @timeComplexity O(n * n!)
 * @spaceComplexity O(n) excluding the returned orderings
 *
 * @example
 * permutations([0, 1]); // [[0, 1], [1, 0]]
 */
export const permutations = (nums: readonly number[]): number[][] => {
	const results: number[][] = [];
	const current: number[] = [];
	const used = new Array<boolean>(nums.length).fill(false);

	const build = (): void => {
		if (current.length === nums.length) {
			results.push([...current]);
			return;
		}

		for (const [i, num] of nums.entries()) {
			if (used[i]) continue;

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
