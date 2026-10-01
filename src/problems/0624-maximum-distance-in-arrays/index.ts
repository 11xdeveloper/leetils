/**
 * 624. Maximum Distance in Arrays
 *
 * Given at least two arrays, each sorted in ascending order, picks one
 * number from each of two different arrays and returns the largest
 * possible `|a - b|`.
 *
 * Only each array's first and last numbers matter. Going through the arrays
 * in turn, it pairs each one's ends with the smallest and largest seen in
 * earlier arrays, which keeps the two picks in different arrays.
 *
 * @see https://leetcode.com/problems/maximum-distance-in-arrays/
 * @difficulty Medium
 * @timeComplexity O(m) for m arrays
 * @spaceComplexity O(1)
 *
 * @example
 * maximumDistanceInArrays([[1, 2, 3], [4, 5], [1, 2, 3]]); // 4
 */
export const maximumDistanceInArrays = (
	arrays: readonly (readonly number[])[],
): number => {
	let min = arrays[0]?.[0] ?? 0;
	let max = arrays[0]?.at(-1) ?? 0;
	let distance = 0;

	for (const array of arrays.slice(1)) {
		const first = array[0] ?? 0;
		const last = array.at(-1) ?? 0;
		distance = Math.max(distance, last - min, max - first);
		min = Math.min(min, first);
		max = Math.max(max, last);
	}

	return distance;
};
