/**
 * 757. Set Intersection Size At Least Two
 *
 * Returns the size of the smallest set of integers that contains at least
 * two numbers from every interval `[start, end]`.
 *
 * Greedy over intervals sorted by end (and, for equal ends, larger starts
 * first). It keeps the two largest chosen numbers. An interval already
 * holding both needs nothing; holding one, it adds its end; holding none,
 * its last two numbers. Picking as far right as possible helps later
 * intervals most.
 *
 * @see https://leetcode.com/problems/set-intersection-size-at-least-two/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * setIntersectionSizeAtLeastTwo([[1, 3], [3, 7], [8, 9]]); // 5
 */
export const setIntersectionSizeAtLeastTwo = (
	intervals: readonly (readonly number[])[],
): number => {
	const sorted = intervals.toSorted(
		(a, b) => (a[1] ?? 0) - (b[1] ?? 0) || (b[0] ?? 0) - (a[0] ?? 0),
	);
	let size = 0;
	let second = Number.NEGATIVE_INFINITY;
	let largest = Number.NEGATIVE_INFINITY;

	for (const [start = 0, end = 0] of sorted) {
		if (start > largest) {
			size += 2;
			[second, largest] = [end - 1, end];
		} else if (start > second) {
			size++;
			[second, largest] = [largest, end];
		}
	}

	return size;
};
