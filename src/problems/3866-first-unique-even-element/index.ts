/**
 * 3866. First Unique Even Element
 *
 * The first even element appearing exactly once in `nums`, or -1.
 *
 * @see https://leetcode.com/problems/first-unique-even-element/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * firstUniqueEvenElement([3, 4, 2, 5, 4, 6]); // 2
 */
export const firstUniqueEvenElement = (nums: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	return nums.find((num) => num % 2 === 0 && counts.get(num) === 1) ?? -1;
};
