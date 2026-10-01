/**
 * 1868. Product of Two Run-Length Encoded Arrays
 *
 * Both arrays are run-length encoded as `[value, frequency]` pairs over
 * equally long arrays. Returns the run-length encoding of their
 * element-wise product, with adjacent equal runs merged.
 *
 * Walk both encodings together, taking the overlap of the current runs
 * each step, without expanding them.
 *
 * @see https://leetcode.com/problems/product-of-two-run-length-encoded-arrays/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * productOfTwoRunLengthEncodedArrays([[1, 3], [2, 1], [3, 2]], [[2, 3], [3, 3]]); // [[2, 3], [6, 1], [9, 2]]
 */
export const productOfTwoRunLengthEncodedArrays = (
	encoded1: readonly (readonly number[])[],
	encoded2: readonly (readonly number[])[],
): number[][] => {
	const result: number[][] = [];
	let [i, j] = [0, 0];
	let [used1, used2] = [0, 0];
	while (i < encoded1.length && j < encoded2.length) {
		const [value1 = 0, frequency1 = 0] = encoded1[i] ?? [];
		const [value2 = 0, frequency2 = 0] = encoded2[j] ?? [];
		const length = Math.min(frequency1 - used1, frequency2 - used2);
		const product = value1 * value2;
		const last = result.at(-1);
		if (last && last[0] === product) last[1] = (last[1] ?? 0) + length;
		else result.push([product, length]);
		used1 += length;
		used2 += length;
		if (used1 === frequency1) [i, used1] = [i + 1, 0];
		if (used2 === frequency2) [j, used2] = [j + 1, 0];
	}
	return result;
};
