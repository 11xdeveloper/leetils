/**
 * 1054. Distant Barcodes
 *
 * Rearranges `barcodes` so no two neighbours are equal (always possible
 * here). Any valid arrangement is accepted.
 *
 * Writes the barcodes, most frequent value first, into the even positions
 * and then the odd ones, which keeps copies of each value apart.
 *
 * @see https://leetcode.com/problems/distant-barcodes/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * distantBarcodes([1, 1, 1, 2, 2, 2]); // [1, 2, 1, 2, 1, 2]
 */
export const distantBarcodes = (barcodes: readonly number[]): number[] => {
	const counts = new Map<number, number>();
	for (const code of barcodes) counts.set(code, (counts.get(code) ?? 0) + 1);
	const result = new Array<number>(barcodes.length);
	let position = 0;
	for (const [code, count] of [...counts].sort((a, b) => b[1] - a[1])) {
		for (let i = 0; i < count; i++) {
			if (position >= result.length) position = 1;
			result[position] = code;
			position += 2;
		}
	}
	return result;
};
