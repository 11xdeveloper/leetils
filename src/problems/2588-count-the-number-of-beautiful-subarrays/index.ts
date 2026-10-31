/**
 * 2588. Count the Number of Beautiful Subarrays
 *
 * An operation subtracts `2^k` from two elements of a subarray that both
 * have bit `k` set. A subarray is beautiful if operations can make it
 * all zeros. Returns the number of beautiful subarrays.
 *
 * That needs every bit set an even number of times, which is to say the
 * subarray's XOR is 0. Count pairs of equal prefix XORs.
 *
 * @see https://leetcode.com/problems/count-the-number-of-beautiful-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfBeautifulSubarrays([4, 3, 1, 2, 4]); // 2
 */
export const countTheNumberOfBeautifulSubarrays = (
	nums: readonly number[],
): number => {
	const seen = new Map([[0, 1]]);
	let xor = 0;
	let beautiful = 0;
	for (const num of nums) {
		xor ^= num;
		const count = seen.get(xor) ?? 0;
		beautiful += count;
		seen.set(xor, count + 1);
	}
	return beautiful;
};
