/**
 * 1739. Building Boxes
 *
 * Places `n` unit boxes in a corner, where a box may only rest on one
 * whose four sides each touch a box or a wall. Returns the fewest boxes
 * touching the floor.
 *
 * The densest shape is a staircase pyramid in the corner: with a floor
 * triangle of side `k` it holds the tetrahedral number `k(k+1)(k+2)/6`.
 * Build the largest one that fits, then add floor boxes along its edge;
 * the `j`-th added floor box lets `j` more boxes fit in total.
 *
 * @see https://leetcode.com/problems/building-boxes/
 * @difficulty Hard
 * @timeComplexity O(∛n)
 * @spaceComplexity O(1)
 *
 * @example
 * buildingBoxes(10); // 6
 */
export const buildingBoxes = (n: number): number => {
	let [side, placed] = [0, 0];
	while (placed + ((side + 1) * (side + 2)) / 2 <= n) {
		side++;
		placed += (side * (side + 1)) / 2;
	}
	let floor = (side * (side + 1)) / 2;
	for (let extra = 1; placed < n; extra++) {
		placed += extra;
		floor++;
	}
	return floor;
};
