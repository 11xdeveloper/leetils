/**
 * 2178. Maximum Split of Positive Even Integers
 *
 * Splits `finalSum` into the most distinct positive even integers, or
 * returns `[]` if it is odd.
 *
 * Take 2, 4, 6, … while they fit, then add what's left to the last.
 *
 * @see https://leetcode.com/problems/maximum-split-of-positive-even-integers/
 * @difficulty Medium
 * @timeComplexity O(√finalSum)
 * @spaceComplexity O(√finalSum)
 *
 * @example
 * maximumSplitOfPositiveEvenIntegers(12); // [2, 4, 6]
 */
export const maximumSplitOfPositiveEvenIntegers = (
	finalSum: number,
): number[] => {
	if (finalSum % 2) return [];
	const parts: number[] = [];
	for (let even = 2; even <= finalSum; even += 2) {
		parts.push(even);
		finalSum -= even;
	}
	if (parts.length) parts[parts.length - 1] = (parts.at(-1) ?? 0) + finalSum;
	return parts;
};
