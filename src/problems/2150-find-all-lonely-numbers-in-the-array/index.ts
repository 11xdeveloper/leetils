/**
 * 2150. Find All Lonely Numbers in the Array
 *
 * A number is lonely when it appears once and neither its predecessor nor
 * successor appears. Returns the lonely numbers in ascending order.
 *
 * Count the numbers, then check each one seen once.
 *
 * @see https://leetcode.com/problems/find-all-lonely-numbers-in-the-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findAllLonelyNumbersInTheArray([10, 6, 5, 8]); // [8, 10]
 */
export const findAllLonelyNumbersInTheArray = (
	nums: readonly number[],
): number[] => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	return nums
		.filter(
			(num) =>
				counts.get(num) === 1 && !counts.has(num - 1) && !counts.has(num + 1),
		)
		.sort((a, b) => a - b);
};
