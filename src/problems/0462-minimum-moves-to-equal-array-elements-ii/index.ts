/**
 * 462. Minimum Moves to Equal Array Elements II
 *
 * A move adds or subtracts 1 from one element. Returns the fewest moves to
 * make every element equal.
 *
 * The total distance to a target is smallest at a median, since moving the
 * target past it brings more elements further away than closer. Pairing the
 * smallest with the largest, the next smallest with the next largest, and
 * so on, each pair costs its difference wherever the median sits between.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * minimumMovesToEqualArrayElementsII([1, 10, 2, 9]); // 16
 */
export const minimumMovesToEqualArrayElementsII = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let moves = 0;
	for (let low = 0, high = sorted.length - 1; low < high; low++, high--) {
		moves += (sorted[high] ?? 0) - (sorted[low] ?? 0);
	}
	return moves;
};
