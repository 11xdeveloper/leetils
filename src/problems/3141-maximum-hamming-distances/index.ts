/**
 * 3141. Maximum Hamming Distances
 *
 * For each element of `nums` (all below 2^m), the largest Hamming distance
 * to another element.
 *
 * The farthest element from x is the one nearest to x's complement, and
 * the distance is m minus that. Find every m-bit value's distance to the
 * nearest element with a breadth-first search from all elements at once,
 * flipping one bit per step.
 *
 * @see https://leetcode.com/problems/maximum-hamming-distances/
 * @difficulty Hard
 * @timeComplexity O(2^m · m + n)
 * @spaceComplexity O(2^m)
 *
 * @example
 * maximumHammingDistances([9, 12, 9, 11], 4); // [2, 3, 2, 3]
 */
export const maximumHammingDistances = (
	nums: readonly number[],
	m: number,
): number[] => {
	const size = 1 << m;
	const distance = new Int8Array(size).fill(-1);
	const queue = new Int32Array(size);
	let tail = 0;
	for (const num of nums)
		if (distance[num] === -1) {
			distance[num] = 0;
			queue[tail++] = num;
		}
	for (let head = 0; head < tail; head++) {
		const value = queue[head] ?? 0;
		for (let bit = 0; bit < m; bit++) {
			const next = value ^ (1 << bit);
			if (distance[next] === -1) {
				distance[next] = (distance[value] ?? 0) + 1;
				queue[tail++] = next;
			}
		}
	}
	return nums.map((num) => m - (distance[(size - 1) ^ num] ?? 0));
};
