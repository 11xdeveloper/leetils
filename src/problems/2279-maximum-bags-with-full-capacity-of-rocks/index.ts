/**
 * 2279. Maximum Bags With Full Capacity of Rocks
 *
 * Bag `i` holds `rocks[i]` of `capacity[i]`. Adding up to
 * `additionalRocks`, returns the most bags that can be full.
 *
 * Fill the bags needing the fewest rocks first.
 *
 * @see https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumBagsWithFullCapacityOfRocks([2, 3, 4, 5], [1, 2, 4, 4], 2); // 3
 */
export const maximumBagsWithFullCapacityOfRocks = (
	capacity: readonly number[],
	rocks: readonly number[],
	additionalRocks: number,
): number => {
	const needed = capacity
		.map((c, i) => c - (rocks[i] ?? 0))
		.sort((a, b) => a - b);
	let full = 0;
	for (const need of needed) {
		if (need > additionalRocks) break;
		additionalRocks -= need;
		full++;
	}
	return full;
};
