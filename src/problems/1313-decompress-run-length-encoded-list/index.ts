/**
 * 1313. Decompress Run-Length Encoded List
 *
 * `nums` is a list of `[freq, val]` pairs. Returns the list with each `val`
 * repeated `freq` times, in order.
 *
 * Expands each pair in turn.
 *
 * @see https://leetcode.com/problems/decompress-run-length-encoded-list/
 * @difficulty Easy
 * @timeComplexity O(total frequency)
 * @spaceComplexity O(total frequency), for the result
 *
 * @example
 * decompressRunLengthEncodedList([1, 2, 3, 4]); // [2, 4, 4, 4]
 */
export const decompressRunLengthEncodedList = (
	nums: readonly number[],
): number[] => {
	const result: number[] = [];
	for (let i = 0; i + 1 < nums.length; i += 2) {
		for (let k = 0; k < (nums[i] ?? 0); k++) result.push(nums[i + 1] ?? 0);
	}
	return result;
};
