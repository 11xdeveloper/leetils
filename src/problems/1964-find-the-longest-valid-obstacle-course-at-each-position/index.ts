/**
 * 1964. Find the Longest Valid Obstacle Course at Each Position
 *
 * For each `i`, returns the length of the longest non-decreasing
 * subsequence of `obstacles[0 … i]` that ends with `obstacles[i]`.
 *
 * Patience sorting with non-strict comparisons: each obstacle replaces
 * the first tail strictly greater than it, and its position is the answer.
 *
 * @see https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLongestValidObstacleCourseAtEachPosition([3, 1, 5, 6, 4, 2]); // [1, 1, 2, 3, 2, 2]
 */
export const findTheLongestValidObstacleCourseAtEachPosition = (
	obstacles: readonly number[],
): number[] => {
	const tails: number[] = [];
	return obstacles.map((height) => {
		let [low, high] = [0, tails.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((tails[mid] ?? 0) <= height) low = mid + 1;
			else high = mid;
		}
		tails[low] = height;
		return low + 1;
	});
};
