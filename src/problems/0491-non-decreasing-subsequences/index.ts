/**
 * 491. Non-decreasing Subsequences
 *
 * Returns every distinct non-decreasing subsequence of `nums` with at least
 * two elements.
 *
 * Backtracking: each step extends the subsequence with a later element no
 * smaller than its last. Duplicates are avoided by trying each value only
 * once at each step, since later copies would lead to the same
 * subsequences.
 *
 * @see https://leetcode.com/problems/non-decreasing-subsequences/
 * @difficulty Medium
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(n) besides the output
 *
 * @example
 * nonDecreasingSubsequences([4, 6, 7, 7]); // [[4, 6], [4, 6, 7], [4, 6, 7, 7], [4, 7], [4, 7, 7], [6, 7], [6, 7, 7], [7, 7]]
 */
export const nonDecreasingSubsequences = (
	nums: readonly number[],
): number[][] => {
	const subsequences: number[][] = [];
	const current: number[] = [];

	const extend = (start: number): void => {
		if (current.length >= 2) subsequences.push([...current]);
		const tried = new Set<number>();
		for (let i = start; i < nums.length; i++) {
			const num = nums[i] ?? 0;
			if (tried.has(num) || num < (current.at(-1) ?? Number.NEGATIVE_INFINITY))
				continue;
			tried.add(num);
			current.push(num);
			extend(i + 1);
			current.pop();
		}
	};

	extend(0);
	return subsequences;
};
