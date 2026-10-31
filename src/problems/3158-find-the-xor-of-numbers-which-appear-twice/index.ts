/**
 * 3158. Find the XOR of Numbers Which Appear Twice
 *
 * The XOR of the numbers that appear twice in `nums` (each appears once or
 * twice), or 0 if none do.
 *
 * XOR each number the second time it's seen.
 *
 * @see https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheXorOfNumbersWhichAppearTwice([1, 2, 1, 3]); // 1
 */
export const findTheXorOfNumbersWhichAppearTwice = (
	nums: readonly number[],
): number => {
	const seen = new Set<number>();
	let result = 0;
	for (const num of nums)
		if (seen.has(num)) result ^= num;
		else seen.add(num);
	return result;
};
