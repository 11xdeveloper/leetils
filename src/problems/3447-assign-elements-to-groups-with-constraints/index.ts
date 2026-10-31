/**
 * 3447. Assign Elements to Groups with Constraints
 *
 * For each group size, the smallest index j of `elements` whose value
 * divides it, or -1.
 *
 * Go through the elements in order, marking each new value's multiples up
 * to the largest group with its index if they don't have one yet. That's a
 * harmonic number of steps per distinct value.
 *
 * @see https://leetcode.com/problems/assign-elements-to-groups-with-constraints/
 * @difficulty Medium
 * @timeComplexity O(V log V + n + m), for values up to V
 * @spaceComplexity O(V)
 *
 * @example
 * assignElementsToGroupsWithConstraints([8, 4, 3, 2, 4], [4, 2]); // [0, 0, -1, 1, 0]
 */
export const assignElementsToGroupsWithConstraints = (
	groups: readonly number[],
	elements: readonly number[],
): number[] => {
	const max = Math.max(...groups);
	const owner = new Int32Array(max + 1).fill(-1);
	const seen = new Set<number>();
	elements.forEach((element, j) => {
		if (seen.has(element) || element > max) return;
		seen.add(element);
		for (let multiple = element; multiple <= max; multiple += element)
			if (owner[multiple] === -1) owner[multiple] = j;
	});
	return groups.map((group) => owner[group] ?? -1);
};
