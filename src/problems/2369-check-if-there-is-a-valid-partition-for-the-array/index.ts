/**
 * 2369. Check if There is a Valid Partition For The Array
 *
 * A valid partition splits `nums` into contiguous blocks of two equal
 * values, three equal values, or three consecutive increasing values.
 * Returns whether one exists.
 *
 * `valid[i]` says whether the first `i` elements can be partitioned.
 *
 * @see https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfThereIsAValidPartitionForTheArray([4, 4, 4, 5, 6]); // true
 */
export const checkIfThereIsAValidPartitionForTheArray = (
	nums: readonly number[],
): boolean => {
	const valid = [true];
	for (let i = 1; i <= nums.length; i++) {
		const [a, b, c] = [nums[i - 3], nums[i - 2], nums[i - 1]];
		valid[i] =
			(!!valid[i - 2] && b === c) ||
			(!!valid[i - 3] &&
				a !== undefined &&
				((a === b && b === c) || (b === a + 1 && c === a + 2)));
	}
	return valid[nums.length] ?? false;
};
