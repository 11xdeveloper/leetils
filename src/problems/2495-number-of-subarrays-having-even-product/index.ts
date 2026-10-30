/**
 * 2495. Number of Subarrays Having Even Product
 *
 * Counts the subarrays with an even product, meaning at least one even
 * element.
 *
 * Each end pairs with every start up to its most recent even element.
 *
 * @see https://leetcode.com/problems/number-of-subarrays-having-even-product/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubarraysHavingEvenProduct([9, 6, 7, 13]); // 6
 */
export const numberOfSubarraysHavingEvenProduct = (
	nums: readonly number[],
): number => {
	let [count, lastEven] = [0, -1];
	for (const [i, num] of nums.entries()) {
		if (num % 2 === 0) lastEven = i;
		count += lastEven + 1;
	}
	return count;
};
