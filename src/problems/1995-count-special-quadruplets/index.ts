/**
 * 1995. Count Special Quadruplets
 *
 * Counts the quadruplets `a < b < c < d` with
 * `nums[a] + nums[b] + nums[c] = nums[d]`.
 *
 * Rewrite as `nums[a] + nums[b] = nums[d] − nums[c]`. Moving `b` from right
 * to left, add the differences for `c = b + 1` to a count, then look up
 * every `nums[a] + nums[b]`.
 *
 * @see https://leetcode.com/problems/count-special-quadruplets/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * countSpecialQuadruplets([1, 1, 1, 3, 5]); // 4
 */
export const countSpecialQuadruplets = (nums: readonly number[]): number => {
	const n = nums.length;
	const differences = new Map<number, number>();
	let count = 0;
	for (let b = n - 3; b >= 1; b--) {
		const c = b + 1;
		for (let d = c + 1; d < n; d++) {
			const difference = (nums[d] ?? 0) - (nums[c] ?? 0);
			differences.set(difference, (differences.get(difference) ?? 0) + 1);
		}
		for (let a = 0; a < b; a++)
			count += differences.get((nums[a] ?? 0) + (nums[b] ?? 0)) ?? 0;
	}
	return count;
};
