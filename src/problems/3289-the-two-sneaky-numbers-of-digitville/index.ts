/**
 * 3289. The Two Sneaky Numbers of Digitville
 *
 * `nums` should hold 0 to n - 1 once each, but two numbers appear twice.
 * Returns those two.
 *
 * Collect the numbers seen a second time.
 *
 * @see https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * theTwoSneakyNumbersOfDigitville([0, 1, 1, 0]); // [1, 0]
 */
export const theTwoSneakyNumbersOfDigitville = (
	nums: readonly number[],
): number[] => {
	const seen = new Set<number>();
	const twice: number[] = [];
	for (const num of nums)
		if (seen.has(num)) twice.push(num);
		else seen.add(num);
	return twice;
};
