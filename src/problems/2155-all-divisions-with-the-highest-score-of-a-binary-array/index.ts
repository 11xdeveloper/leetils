/**
 * 2155. All Divisions With the Highest Score of a Binary Array
 *
 * Dividing `nums` at index `i` scores the 0s before `i` plus the 1s from
 * `i` on. Returns every division index with the highest score, ascending.
 *
 * Start with every 1 counted, then adjust the score as the split moves.
 *
 * @see https://leetcode.com/problems/all-divisions-with-the-highest-score-of-a-binary-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * allDivisionsWithTheHighestScoreOfABinaryArray([0, 0, 1, 0]); // [2, 4]
 */
export const allDivisionsWithTheHighestScoreOfABinaryArray = (
	nums: readonly number[],
): number[] => {
	let score = nums.filter((num) => num === 1).length;
	let best = score;
	let indices = [0];
	for (const [i, num] of nums.entries()) {
		score += num === 0 ? 1 : -1;
		if (score > best) [best, indices] = [score, [i + 1]];
		else if (score === best) indices.push(i + 1);
	}
	return indices;
};
