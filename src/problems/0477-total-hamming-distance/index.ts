/**
 * 477. Total Hamming Distance
 *
 * Returns the sum of the Hamming distances between every pair of numbers in
 * `nums`.
 *
 * Bit positions are independent: if `k` numbers have a given bit set, that
 * bit differs in `k · (n - k)` pairs.
 *
 * @see https://leetcode.com/problems/total-hamming-distance/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * totalHammingDistance([4, 14, 2]); // 6
 */
export const totalHammingDistance = (nums: readonly number[]): number => {
	let total = 0;
	for (let bit = 0; bit < 32; bit++) {
		let set = 0;
		for (const num of nums) set += (num >>> bit) & 1;
		total += set * (nums.length - set);
	}
	return total;
};
