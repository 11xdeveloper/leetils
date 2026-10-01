/**
 * 416. Partition Equal Subset Sum
 *
 * Returns whether `nums` can be split into two subsets with equal sums.
 *
 * That needs a subset adding up to exactly half the total. Dynamic
 * programming marks which sums are reachable, adding each number to every
 * sum already reachable (from the top down, so each number is used once).
 *
 * @see https://leetcode.com/problems/partition-equal-subset-sum/
 * @difficulty Medium
 * @timeComplexity O(n * sum)
 * @spaceComplexity O(sum)
 *
 * @example
 * partitionEqualSubsetSum([1, 5, 11, 5]); // true: [1, 5, 5] and [11]
 */
export const partitionEqualSubsetSum = (nums: readonly number[]): boolean => {
	const total = nums.reduce((sum, num) => sum + num, 0);
	if (total % 2 === 1) return false;

	const half = total / 2;
	const reachable = new Uint8Array(half + 1);
	reachable[0] = 1;
	for (const num of nums) {
		for (let sum = half; sum >= num; sum--)
			if (reachable[sum - num] === 1) reachable[sum] = 1;
	}

	return reachable[half] === 1;
};
