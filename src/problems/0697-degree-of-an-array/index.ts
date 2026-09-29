/**
 * 697. Degree of an Array
 *
 * The degree of an array is the highest frequency of any value in it.
 * Returns the length of the shortest subarray of `nums` with the same
 * degree as `nums`.
 *
 * Such a subarray must contain every occurrence of some most frequent
 * value, so the answer is the shortest span from first to last occurrence
 * among those values.
 *
 * @see https://leetcode.com/problems/degree-of-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * degreeOfAnArray([1, 2, 2, 3, 1]); // 2: [2, 2]
 */
export const degreeOfAnArray = (nums: readonly number[]): number => {
	const stats = new Map<
		number,
		{ count: number; first: number; last: number }
	>();
	for (const [i, num] of nums.entries()) {
		const entry = stats.get(num);
		if (entry) {
			entry.count++;
			entry.last = i;
		} else {
			stats.set(num, { count: 1, first: i, last: i });
		}
	}

	let degree = 0;
	let shortest = 0;
	for (const { count, first, last } of stats.values()) {
		const span = last - first + 1;
		if (count > degree || (count === degree && span < shortest)) {
			degree = count;
			shortest = span;
		}
	}
	return shortest;
};
