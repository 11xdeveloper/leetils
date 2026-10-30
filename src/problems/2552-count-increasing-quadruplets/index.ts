/**
 * 2552. Count Increasing Quadruplets
 *
 * Returns the number of index quadruplets `i < j < k < l` of a
 * permutation with `nums[i] < nums[k] < nums[j] < nums[l]`.
 *
 * Scan each index as the last element, keeping `triples[j]`: the number
 * of `(i, k)` pairs seen so far that fit around `j`. Sweeping the earlier
 * indices, one smaller than the current value can be `j` (add its
 * triples), and one larger can be `j` for the current value as `k`, with
 * any smaller value before it as `i`.
 *
 * @see https://leetcode.com/problems/count-increasing-quadruplets/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * countIncreasingQuadruplets([1, 3, 2, 4, 5]); // 2
 */
export const countIncreasingQuadruplets = (nums: readonly number[]): number => {
	const triples = nums.map(() => 0);
	let quadruplets = 0;
	for (let last = 0; last < nums.length; last++) {
		const value = nums[last] ?? 0;
		let smaller = 0;
		for (let j = 0; j < last; j++) {
			if ((nums[j] ?? 0) < value) {
				smaller++;
				quadruplets += triples[j] ?? 0;
			} else triples[j] = (triples[j] ?? 0) + smaller;
		}
	}
	return quadruplets;
};
