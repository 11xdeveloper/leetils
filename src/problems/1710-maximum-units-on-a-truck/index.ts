/**
 * 1710. Maximum Units on a Truck
 *
 * Each box type `[count, units]` offers `count` boxes holding `units`
 * each. Returns the most units fitting in `truckSize` boxes.
 *
 * Greedily loads the boxes with the most units first.
 *
 * @see https://leetcode.com/problems/maximum-units-on-a-truck/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumUnitsOnATruck([[5, 10], [2, 5], [4, 7], [3, 9]], 10); // 91
 */
export const maximumUnitsOnATruck = (
	boxTypes: readonly (readonly number[])[],
	truckSize: number,
): number => {
	let [space, units] = [truckSize, 0];
	for (const [count = 0, perBox = 0] of boxTypes.toSorted(
		(a, b) => (b[1] ?? 0) - (a[1] ?? 0),
	)) {
		const taken = Math.min(count, space);
		units += taken * perBox;
		space -= taken;
	}
	return units;
};
