/**
 * 2103. Rings and Rods
 *
 * `rings` lists colour-rod pairs such as "B0R0G0". Counts the rods
 * holding rings of all three colours.
 *
 * Collect a bitmask of colours per rod.
 *
 * @see https://leetcode.com/problems/rings-and-rods/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * ringsAndRods("B0B6G0R6R0R6G9"); // 1
 */
export const ringsAndRods = (rings: string): number => {
	const colours = new Array<number>(10).fill(0);
	const bit: Record<string, number> = { R: 1, G: 2, B: 4 };
	for (let i = 0; i < rings.length; i += 2) {
		const rod = Number(rings[i + 1]);
		colours[rod] = (colours[rod] ?? 0) | (bit[rings[i] ?? ""] ?? 0);
	}
	return colours.filter((mask) => mask === 7).length;
};
