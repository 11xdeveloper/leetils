/**
 * 922. Sort Array By Parity II
 *
 * `nums` has as many even numbers as odd. Returns a rearrangement with even
 * numbers at even indices and odd numbers at odd indices.
 *
 * Writes evens into the even slots and odds into the odd slots of a new
 * array, in their original order.
 *
 * @see https://leetcode.com/problems/sort-array-by-parity-ii/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the result
 *
 * @example
 * sortArrayByParityII([4, 2, 5, 7]); // [4, 5, 2, 7]
 */
export const sortArrayByParityII = (nums: readonly number[]): number[] => {
	const result = new Array<number>(nums.length);
	let even = 0;
	let odd = 1;
	for (const num of nums) {
		if (num % 2 === 0) {
			result[even] = num;
			even += 2;
		} else {
			result[odd] = num;
			odd += 2;
		}
	}
	return result;
};
