/**
 * 3514. Number of Unique XOR Triplets II
 *
 * How many distinct values `nums[i] ^ nums[j] ^ nums[k]` take over
 * i ≤ j ≤ k, for values up to 1500.
 *
 * XORs stay below 2048, so collect every pairwise XOR, then XOR each with
 * every element. Repeated indices are fine since x ^ x is 0.
 *
 * @see https://leetcode.com/problems/number-of-unique-xor-triplets-ii/
 * @difficulty Medium
 * @timeComplexity O(n² + 2048 · n)
 * @spaceComplexity O(2048)
 *
 * @example
 * numberOfUniqueXorTripletsII([1, 3]); // 2
 */
export const numberOfUniqueXorTripletsII = (
	nums: readonly number[],
): number => {
	const values = [...new Set(nums)];
	const pairs = new Uint8Array(2048);
	for (const a of values) for (const b of values) pairs[a ^ b] = 1;
	const triples = new Uint8Array(2048);
	for (let p = 0; p < 2048; p++)
		if (pairs[p]) for (const c of values) triples[p ^ c] = 1;
	return triples.reduce((count, flag) => count + flag, 0);
};
