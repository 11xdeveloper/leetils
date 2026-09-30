/**
 * 1496. Path Crossing
 *
 * Walking from the origin by the steps in `path` (`N`, `S`, `E`, `W`),
 * returns whether any point is visited twice.
 *
 * Records every point visited in a set.
 *
 * @see https://leetcode.com/problems/path-crossing/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * pathCrossing("NESWW"); // true
 */
export const pathCrossing = (path: string): boolean => {
	let [x, y] = [0, 0];
	const visited = new Set(["0,0"]);
	for (const step of path) {
		if (step === "N") y++;
		else if (step === "S") y--;
		else if (step === "E") x++;
		else x--;
		const key = `${x},${y}`;
		if (visited.has(key)) return true;
		visited.add(key);
	}
	return false;
};
