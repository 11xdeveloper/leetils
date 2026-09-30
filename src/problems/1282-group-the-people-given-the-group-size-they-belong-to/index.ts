/**
 * 1282. Group the People Given the Group Size They Belong To
 *
 * Person `i` must be in a group of exactly `groupSizes[i]` people. Returns
 * any such grouping (one is guaranteed to exist).
 *
 * Collects people into an open group per size, closing a group when it's
 * full.
 *
 * @see https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * groupThePeopleGivenTheGroupSizeTheyBelongTo([2, 1, 3, 3, 3, 2]); // [[1], [0, 5], [2, 3, 4]]
 */
export const groupThePeopleGivenTheGroupSizeTheyBelongTo = (
	groupSizes: readonly number[],
): number[][] => {
	const open = new Map<number, number[]>();
	const groups: number[][] = [];
	groupSizes.forEach((size, person) => {
		const group = open.get(size) ?? [];
		group.push(person);
		if (group.length === size) {
			groups.push(group);
			open.delete(size);
		} else {
			open.set(size, group);
		}
	});
	return groups;
};
