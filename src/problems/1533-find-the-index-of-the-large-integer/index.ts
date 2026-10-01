/** The interface LeetCode provides for comparing parts of the hidden array. */
interface ArrayReader {
	compareSub(l: number, r: number, x: number, y: number): number;
	length(): number;
}

/**
 * 1533. Find the Index of the Large Integer
 *
 * Every element of the hidden array is equal except one larger one. Using
 * `reader.compareSub` (comparing the sums of two ranges, at most 20 calls),
 * returns that element's index.
 *
 * Binary search: compare the two halves of the remaining range (leaving
 * the middle element out if the length is odd). The heavier half holds the
 * large element; if they balance, it's the middle one.
 *
 * @see https://leetcode.com/problems/find-the-index-of-the-large-integer/
 * @difficulty Medium
 * @timeComplexity O(log n) calls
 * @spaceComplexity O(1)
 *
 * @example
 * findTheIndexOfTheLargeInteger(reader); // the index of the large element
 */
export const findTheIndexOfTheLargeInteger = (reader: ArrayReader): number => {
	let [low, high] = [0, reader.length() - 1];
	while (low < high) {
		const half = Math.floor((high - low + 1) / 2);
		const result = reader.compareSub(
			low,
			low + half - 1,
			high - half + 1,
			high,
		);
		// Equal halves can only happen with an odd length: the middle element is the one.
		if (result === 0) return low + half;
		if (result > 0) high = low + half - 1;
		else low = high - half + 1;
	}
	return low;
};
