/**
 * 3074. Apple Redistribution into Boxes
 *
 * The fewest boxes, with the given capacities, that can hold all the apples
 * from the packs in `apple`. Apples from a pack can be split between boxes.
 *
 * Fill the biggest boxes first.
 *
 * @see https://leetcode.com/problems/apple-redistribution-into-boxes/
 * @difficulty Easy
 * @timeComplexity O(m log m + n)
 * @spaceComplexity O(m)
 *
 * @example
 * appleRedistributionIntoBoxes([1, 3, 2], [4, 3, 1, 5, 2]); // 2
 */
export const appleRedistributionIntoBoxes = (
	apple: readonly number[],
	capacity: readonly number[],
): number => {
	let left = apple.reduce((a, b) => a + b, 0);
	let boxes = 0;
	for (const size of capacity.toSorted((a, b) => b - a)) {
		if (left <= 0) break;
		left -= size;
		boxes++;
	}
	return boxes;
};
