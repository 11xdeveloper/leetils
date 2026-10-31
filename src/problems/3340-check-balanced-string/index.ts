/**
 * 3340. Check Balanced String
 *
 * Whether the digits at even indices of `num` add up to the same as those
 * at odd indices.
 *
 * Add even-index digits and subtract odd-index ones.
 *
 * @see https://leetcode.com/problems/check-balanced-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkBalancedString("24123"); // true
 */
export const checkBalancedString = (num: string): boolean => {
	let balance = 0;
	for (let i = 0; i < num.length; i++)
		balance += (i % 2 === 0 ? 1 : -1) * Number(num[i]);
	return balance === 0;
};
