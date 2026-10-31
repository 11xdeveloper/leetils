/**
 * 3730. Maximum Calories Burnt from Jumps
 *
 * Starting on the ground (height 0), jump onto every block exactly once
 * in any order; a jump between heights a and b burns (a - b)². Returns the
 * most calories burnt.
 *
 * Swing between extremes: the tallest block first, then the shortest,
 * the second tallest, the second shortest, and so on.
 *
 * @see https://leetcode.com/problems/maximum-calories-burnt-from-jumps/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumCaloriesBurntFromJumps([1, 7, 9]); // 181
 */
export const maximumCaloriesBurntFromJumps = (
	heights: readonly number[],
): number => {
	const sorted = [...heights].sort((a, b) => a - b);
	let [lo, hi] = [0, sorted.length - 1];
	let at = 0;
	let total = 0;
	for (let turn = 0; lo <= hi; turn++) {
		const next = turn % 2 === 0 ? (sorted[hi--] ?? 0) : (sorted[lo++] ?? 0);
		total += (next - at) ** 2;
		at = next;
	}
	return total;
};
