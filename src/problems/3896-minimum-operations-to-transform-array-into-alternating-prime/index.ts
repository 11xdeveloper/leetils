/**
 * 3896. Minimum Operations to Transform Array into Alternating Prime
 *
 * Increment elements until those at even indices are prime and those at
 * odd indices aren't. Returns the fewest increments.
 *
 * Each element independently climbs to the nearest number of the right
 * kind, found with a sieve.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-transform-array-into-alternating-prime/
 * @difficulty Medium
 * @timeComplexity O(n + V log log V)
 * @spaceComplexity O(V)
 *
 * @example
 * minimumOperationsToTransformArrayIntoAlternatingPrime([1, 2, 3, 4]); // 3
 */
export const minimumOperationsToTransformArrayIntoAlternatingPrime = (
	nums: readonly number[],
): number => {
	const limit = Math.max(...nums) * 2 + 10;
	const composite = new Uint8Array(limit + 1);
	composite[0] = composite[1] = 1;
	for (let p = 2; p * p <= limit; p++)
		if (!composite[p]) for (let x = p * p; x <= limit; x += p) composite[x] = 1;
	let operations = 0;
	nums.forEach((num, i) => {
		let x = num;
		while ((composite[x] === 0) !== (i % 2 === 0)) x++;
		operations += x - num;
	});
	return operations;
};
