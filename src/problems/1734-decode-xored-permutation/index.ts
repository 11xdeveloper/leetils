/**
 * 1734. Decode XORed Permutation
 *
 * `perm` is a permutation of `1 … n` (odd `n`) and
 * `encoded[i] = perm[i] XOR perm[i + 1]`. Returns `perm`.
 *
 * XORing the encoded values at odd indices gives all of `perm` except the
 * first element, and XORing `1 … n` gives all of it, so the two together
 * reveal `perm[0]`; decode the rest from there.
 *
 * @see https://leetcode.com/problems/decode-xored-permutation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * decodeXoredPermutation([6, 5, 4, 6]); // [2, 4, 1, 5, 3]
 */
export const decodeXoredPermutation = (
	encoded: readonly number[],
): number[] => {
	const n = encoded.length + 1;
	let first = 0;
	for (let value = 1; value <= n; value++) first ^= value;
	for (let i = 1; i < encoded.length; i += 2) first ^= encoded[i] ?? 0;
	const perm = [first];
	for (const value of encoded) perm.push((perm.at(-1) ?? 0) ^ value);
	return perm;
};
