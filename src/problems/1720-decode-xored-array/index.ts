/**
 * 1720. Decode XORed Array
 *
 * `encoded[i] = arr[i] XOR arr[i + 1]`. Given `encoded` and `arr[0]`,
 * returns `arr`.
 *
 * Each element is the previous one XOR the next encoded value.
 *
 * @see https://leetcode.com/problems/decode-xored-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * decodeXoredArray([1, 2, 3], 1); // [1, 0, 2, 1]
 */
export const decodeXoredArray = (
	encoded: readonly number[],
	first: number,
): number[] => {
	const arr = [first];
	for (const value of encoded) arr.push((arr.at(-1) ?? 0) ^ value);
	return arr;
};
