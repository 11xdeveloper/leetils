/**
 * 771. Jewels and Stones
 *
 * Counts how many of the `stones` (one character each, case-sensitive) are
 * jewels, i.e. appear in `jewels`.
 *
 * Puts the jewel types in a set and checks each stone.
 *
 * @see https://leetcode.com/problems/jewels-and-stones/
 * @difficulty Easy
 * @timeComplexity O(j + s)
 * @spaceComplexity O(j)
 *
 * @example
 * jewelsAndStones("aA", "aAAbbbb"); // 3
 */
export const jewelsAndStones = (jewels: string, stones: string): number => {
	const types = new Set(jewels);
	let count = 0;
	for (const stone of stones) if (types.has(stone)) count++;
	return count;
};
