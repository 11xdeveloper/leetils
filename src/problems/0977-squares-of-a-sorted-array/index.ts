/**
 * 977. Squares of a Sorted Array
 *
 * Returns the squares of the sorted array `nums`, sorted, in O(n) time.
 *
 * The largest square is at one end or the other, so two pointers fill the
 * result from the back.
 *
 * @see https://leetcode.com/problems/squares-of-a-sorted-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * squaresOfASortedArray([-4, -1, 0, 3, 10]); // [0, 1, 9, 16, 100]
 */
export const squaresOfASortedArray = (nums: readonly number[]): number[] => {
	const result = new Array<number>(nums.length);
	for (
		let low = 0, high = nums.length - 1, write = nums.length - 1;
		write >= 0;
		write--
	) {
		const [a, b] = [(nums[low] ?? 0) ** 2, (nums[high] ?? 0) ** 2];
		if (a > b) {
			result[write] = a;
			low++;
		} else {
			result[write] = b;
			high--;
		}
	}
	return result;
};
