/**
 * 3842. Toggle Light Bulbs
 *
 * Starting with every bulb off, toggle each bulb listed in `bulbs`.
 * Returns the bulbs left on, in increasing order.
 *
 * @see https://leetcode.com/problems/toggle-light-bulbs/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * toggleLightBulbs([10, 30, 20, 10]); // [20, 30]
 */
export const toggleLightBulbs = (bulbs: readonly number[]): number[] => {
	const on = new Set<number>();
	for (const bulb of bulbs) {
		if (on.has(bulb)) on.delete(bulb);
		else on.add(bulb);
	}
	return [...on].sort((a, b) => a - b);
};
