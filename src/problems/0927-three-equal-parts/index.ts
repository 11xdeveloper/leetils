/**
 * 927. Three Equal Parts
 *
 * Splits the binary array `arr` into three non-empty parts representing the
 * same binary value (leading zeros allowed). Returns `[i, j]` where the
 * parts are `arr[0..i]`, `arr[i+1..j-1]` and `arr[j..]`, or `[-1, -1]` if
 * it's impossible.
 *
 * Each part needs a third of the 1s. The last part's trailing zeros are
 * fixed, so each part's pattern runs from its first 1 for the same length
 * as the last part's. Those three stretches must match and not overlap.
 *
 * @see https://leetcode.com/problems/three-equal-parts/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1) beyond the index list
 *
 * @example
 * threeEqualParts([1, 0, 1, 0, 1]); // [0, 3]
 */
export const threeEqualParts = (arr: readonly number[]): number[] => {
	const ones = arr.flatMap((bit, i) => (bit === 1 ? [i] : []));
	const n = arr.length;
	if (ones.length === 0) return [0, n - 1];
	if (ones.length % 3 !== 0) return [-1, -1];

	const third = ones.length / 3;
	const starts = [ones[0] ?? 0, ones[third] ?? 0, ones[2 * third] ?? 0];
	const length = n - (starts[2] ?? 0);
	const [a = 0, b = 0, c = 0] = starts;
	if (a + length > b || b + length > c) return [-1, -1];
	for (let k = 0; k < length; k++)
		if (arr[a + k] !== arr[b + k] || arr[a + k] !== arr[c + k]) return [-1, -1];
	return [a + length - 1, b + length];
};
