/**
 * 1829. Maximum XOR for Each Query
 *
 * For the sorted `nums`, query `i` asks for the `k < 2^maximumBit`
 * maximising the XOR of all remaining elements with `k`, then removes the
 * last element. Returns the answers.
 *
 * The best `k` flips every one of the low `maximumBit` bits of the running
 * XOR, so take the prefix XORs from longest to shortest.
 *
 * @see https://leetcode.com/problems/maximum-xor-for-each-query/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * maximumXorForEachQuery([0, 1, 1, 3], 2); // [0, 3, 2, 3]
 */
export const maximumXorForEachQuery = (
	nums: readonly number[],
	maximumBit: number,
): number[] => {
	const mask = (1 << maximumBit) - 1;
	let xor = 0;
	const answers = nums.map((num) => {
		xor ^= num;
		return xor ^ mask;
	});
	return answers.reverse();
};
