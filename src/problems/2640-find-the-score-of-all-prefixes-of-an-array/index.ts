/**
 * 2640. Find the Score of All Prefixes of an Array
 *
 * The conversion of an array maps each element to itself plus the largest
 * element up to it; its score is the conversion's sum. Returns the score
 * of every prefix of `nums`.
 *
 * Track the running maximum and the running sum together.
 *
 * @see https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheScoreOfAllPrefixesOfAnArray([2, 3, 7, 5, 10]); // [4, 10, 24, 36, 56]
 */
export const findTheScoreOfAllPrefixesOfAnArray = (
	nums: readonly number[],
): number[] => {
	let largest = 0;
	let score = 0;
	return nums.map((num) => {
		largest = Math.max(largest, num);
		score += num + largest;
		return score;
	});
};
