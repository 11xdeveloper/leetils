/**
 * 548. Split Array with Equal Sum
 *
 * Returns whether there are indices `0 < i`, `i + 1 < j`, `j + 1 < k < n - 1`
 * such that removing `nums[i]`, `nums[j]` and `nums[k]` leaves four
 * subarrays with equal sums.
 *
 * With prefix sums, each subarray sum is O(1). For each middle cut `j`, it
 * collects the sums achievable by an `i` that balances the first two parts,
 * then looks for a `k` that balances the last two with one of those sums.
 *
 * @see https://leetcode.com/problems/split-array-with-equal-sum/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * splitArrayWithEqualSum([1, 2, 1, 2, 1, 2, 1]); // true: i = 1, j = 3, k = 5
 */
export const splitArrayWithEqualSum = (nums: readonly number[]): boolean => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	// The sum of nums[from..to], inclusive.
	const sum = (from: number, to: number): number =>
		(prefix[to + 1] ?? 0) - (prefix[from] ?? 0);

	for (let j = 3; j < n - 3; j++) {
		const balanced = new Set<number>();
		for (let i = 1; i < j - 1; i++) {
			if (sum(0, i - 1) === sum(i + 1, j - 1)) balanced.add(sum(0, i - 1));
		}
		for (let k = j + 2; k < n - 1; k++) {
			if (
				sum(j + 1, k - 1) === sum(k + 1, n - 1) &&
				balanced.has(sum(k + 1, n - 1))
			)
				return true;
		}
	}

	return false;
};
