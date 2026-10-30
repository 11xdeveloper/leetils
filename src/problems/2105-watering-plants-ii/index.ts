/**
 * 2105. Watering Plants II
 *
 * Alice waters plants from the left and Bob from the right, at the same
 * pace, refilling instantly when their can won't cover the next plant. If
 * they reach the same plant, whoever has more water (Alice on a tie)
 * waters it. Returns the number of refills.
 *
 * Walk two pointers towards each other.
 *
 * @see https://leetcode.com/problems/watering-plants-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * wateringPlantsII([2, 2, 3, 3], 5, 5); // 1
 */
export const wateringPlantsII = (
	plants: readonly number[],
	capacityA: number,
	capacityB: number,
): number => {
	let [i, j, alice, bob, refills] = [
		0,
		plants.length - 1,
		capacityA,
		capacityB,
		0,
	];
	for (; i < j; i++, j--) {
		const [left, right] = [plants[i] ?? 0, plants[j] ?? 0];
		if (alice < left) [alice, refills] = [capacityA, refills + 1];
		if (bob < right) [bob, refills] = [capacityB, refills + 1];
		alice -= left;
		bob -= right;
	}
	if (i === j && Math.max(alice, bob) < (plants[i] ?? 0)) refills++;
	return refills;
};
