/**
 * 3618. Split Array by Prime Indices
 *
 * Put the elements at prime indices in one group and the rest in another.
 * Returns the absolute difference of the groups' sums.
 *
 * Sieve the indices.
 *
 * @see https://leetcode.com/problems/split-array-by-prime-indices/
 * @difficulty Medium
 * @timeComplexity O(n log log n)
 * @spaceComplexity O(n)
 *
 * @example
 * splitArrayByPrimeIndices([2, 3, 4]); // 1
 */
export const splitArrayByPrimeIndices = (nums: readonly number[]): number => {
	const n = nums.length;
	const composite = new Uint8Array(n + 1);
	composite[0] = composite[1] = 1;
	for (let p = 2; p * p < n; p++)
		if (!composite[p]) for (let x = p * p; x < n; x += p) composite[x] = 1;
	let difference = 0;
	nums.forEach((num, i) => {
		difference += composite[i] ? -num : num;
	});
	return Math.abs(difference);
};
