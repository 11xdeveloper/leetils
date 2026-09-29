/**
 * 260. Single Number III
 *
 * Every value in `nums` appears twice except two, which appear once each.
 * Returns those two, in any order.
 *
 * XOR-ing everything leaves `a ^ b`, which has a bit set wherever the two
 * singles differ. Splitting all the values by one such bit puts `a` and `b`
 * in different groups, with every pair in the same group as itself, so
 * XOR-ing each group gives one single each. JavaScript's bitwise operators
 * work on 32-bit integers, which fits the problem's range.
 *
 * @see https://leetcode.com/problems/single-number-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * singleNumberIII([1, 2, 1, 3, 2, 5]); // [3, 5]
 */
export const singleNumberIII = (nums: readonly number[]): number[] => {
	const both = nums.reduce((xor, num) => xor ^ num, 0);
	const differingBit = both & -both;

	let first = 0;
	for (const num of nums) if (num & differingBit) first ^= num;

	return [first, both ^ first];
};
