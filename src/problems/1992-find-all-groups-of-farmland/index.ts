/**
 * 1992. Find All Groups of Farmland
 *
 * Farmland (1s) forms separate rectangles. Returns each as
 * `[top, left, bottom, right]`.
 *
 * A cell with no farmland above or to its left is a rectangle's top-left
 * corner; walk down and right from it to find the far corner.
 *
 * @see https://leetcode.com/problems/find-all-groups-of-farmland/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * findAllGroupsOfFarmland([[1, 0, 0], [0, 1, 1], [0, 1, 1]]); // [[0, 0, 0, 0], [1, 1, 2, 2]]
 */
export const findAllGroupsOfFarmland = (
	land: readonly (readonly number[])[],
): number[][] => {
	const groups: number[][] = [];
	for (const [r, row] of land.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 1 || land[r - 1]?.[c] === 1 || row[c - 1] === 1) continue;
			let [bottom, right] = [r, c];
			while (land[bottom + 1]?.[c] === 1) bottom++;
			while (row[right + 1] === 1) right++;
			groups.push([r, c, bottom, right]);
		}
	}
	return groups;
};
