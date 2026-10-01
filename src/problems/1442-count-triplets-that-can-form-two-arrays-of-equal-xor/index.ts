/**
 * 1442. Count Triplets That Can Form Two Arrays of Equal XOR
 *
 * Counts triples `i < j ≤ k` where the XOR of `arr[i … j − 1]` equals the
 * XOR of `arr[j … k]`.
 *
 * Equal XORs means `arr[i … k]` XORs to 0, and then every `j` in between
 * works, giving `k − i` triples. With prefix XORs, a zero range from `i` to
 * `k` is a repeated prefix, so for each prefix value track how many earlier
 * prefixes had it and the sum of their positions.
 *
 * @see https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTripletsThatCanFormTwoArraysOfEqualXor([2, 3, 1, 6, 7]); // 4
 */
export const countTripletsThatCanFormTwoArraysOfEqualXor = (
	arr: readonly number[],
): number => {
	// For each prefix XOR: how many prefixes had it, and the sum of their lengths.
	const seen = new Map<number, [count: number, lengths: number]>([[0, [1, 0]]]);
	let [prefix, triples] = [0, 0];
	arr.forEach((value, k) => {
		prefix ^= value;
		const [count, lengths] = seen.get(prefix) ?? [0, 0];
		// Each earlier prefix of length i pairs with this end k to give k − i triples.
		triples += count * k - lengths;
		seen.set(prefix, [count + 1, lengths + k + 1]);
	});
	return triples;
};
