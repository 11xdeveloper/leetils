/**
 * 2422. Merge Operations to Turn Array Into a Palindrome
 *
 * An operation replaces two adjacent numbers with their sum. Returns the
 * fewest operations to make the positive `nums` a palindrome.
 *
 * Compare the two ends; merge the smaller end inward until they match.
 *
 * @see https://leetcode.com/problems/merge-operations-to-turn-array-into-a-palindrome/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * mergeOperationsToTurnArrayIntoAPalindrome([4, 3, 2, 1, 2, 3, 1]); // 2
 */
export const mergeOperationsToTurnArrayIntoAPalindrome = (
	nums: readonly number[],
): number => {
	let [i, j] = [0, nums.length - 1];
	let [left, right] = [nums[i] ?? 0, nums[j] ?? 0];
	let operations = 0;
	while (i < j) {
		if (left === right) {
			left = nums[++i] ?? 0;
			right = nums[--j] ?? 0;
		} else if (left < right) {
			left += nums[++i] ?? 0;
			operations++;
		} else {
			right += nums[--j] ?? 0;
			operations++;
		}
	}
	return operations;
};
