/**
 * 2965. Find Missing and Repeated Values
 *
 * An `n × n` grid holds the numbers 1 to `n²` except that one appears
 * twice and one not at all. Returns `[repeated, missing]`.
 *
 * Count each number.
 *
 * @see https://leetcode.com/problems/find-missing-and-repeated-values/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * findMissingAndRepeatedValues([[9, 1, 7], [8, 9, 2], [3, 4, 6]]); // [9, 5]
 */
export const findMissingAndRepeatedValues = (
	grid: readonly (readonly number[])[],
): number[] => {
	const size = grid.length * grid.length;
	const seen = new Uint8Array(size + 1);
	let repeated = 0;
	for (const row of grid)
		for (const value of row) {
			if (seen[value]) repeated = value;
			seen[value] = 1;
		}
	let missing = 0;
	for (let x = 1; x <= size; x++) if (!seen[x]) missing = x;
	return [repeated, missing];
};
