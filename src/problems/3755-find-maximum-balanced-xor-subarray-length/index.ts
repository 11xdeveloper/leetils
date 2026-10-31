/**
 * 3755. Find Maximum Balanced XOR Subarray Length
 *
 * The longest subarray whose XOR is 0 and which has as many even elements
 * as odd ones.
 *
 * Both conditions compare prefixes: equal prefix XOR and equal prefix
 * (even - odd) balance. Keep the first index of each pair.
 *
 * @see https://leetcode.com/problems/find-maximum-balanced-xor-subarray-length/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMaximumBalancedXorSubarrayLength([3, 1, 3, 2, 0]); // 4
 */
export const findMaximumBalancedXorSubarrayLength = (
	nums: readonly number[],
): number => {
	const first = new Map<string, number>([["0,0", -1]]);
	let [xor, balance, best] = [0, 0, 0];
	nums.forEach((num, i) => {
		xor ^= num;
		balance += num % 2 === 0 ? 1 : -1;
		const key = `${xor},${balance}`;
		const seen = first.get(key);
		if (seen === undefined) first.set(key, i);
		else best = Math.max(best, i - seen);
	});
	return best;
};
