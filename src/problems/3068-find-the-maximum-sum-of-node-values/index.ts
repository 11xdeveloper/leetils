/**
 * 3068. Find the Maximum Sum of Node Values
 *
 * Any number of times, pick an edge of the tree and XOR both its ends'
 * values with `k`. Returns the largest possible sum of the values.
 *
 * XORing along a path changes only its ends, so any even-sized set of
 * nodes can be XORed and nothing else can. Take every node's better value,
 * and if that XORs an odd number of nodes, give up the smallest gain or
 * accept the smallest loss.
 *
 * @see https://leetcode.com/problems/find-the-maximum-sum-of-node-values/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheMaximumSumOfNodeValues([1, 2, 1], 3, [[0, 1], [0, 2]]); // 6
 */
export const findTheMaximumSumOfNodeValues = (
	nums: readonly number[],
	k: number,
	_edges: readonly (readonly number[])[],
): number => {
	let sum = 0;
	let flipped = 0;
	let smallestChange = Number.POSITIVE_INFINITY;
	for (const num of nums) {
		const xored = num ^ k;
		sum += Math.max(num, xored);
		if (xored > num) flipped++;
		smallestChange = Math.min(smallestChange, Math.abs(xored - num));
	}
	return flipped % 2 === 0 ? sum : sum - smallestChange;
};
