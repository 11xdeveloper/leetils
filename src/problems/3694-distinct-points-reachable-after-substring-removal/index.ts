/**
 * 3694. Distinct Points Reachable After Substring Removal
 *
 * Remove exactly one substring of length `k` from the moves `s` (U, D, L,
 * R) and follow the rest from the origin. Counts the distinct endpoints.
 *
 * The endpoint is the full walk minus the removed window's displacement,
 * so count distinct window displacements with a sliding window.
 *
 * @see https://leetcode.com/problems/distinct-points-reachable-after-substring-removal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * distinctPointsReachableAfterSubstringRemoval("LUL", 1); // 2
 */
export const distinctPointsReachableAfterSubstringRemoval = (
	s: string,
	k: number,
): number => {
	const step = (c: string): [number, number] =>
		c === "U" ? [0, 1] : c === "D" ? [0, -1] : c === "L" ? [-1, 0] : [1, 0];
	const seen = new Set<string>();
	let [x, y] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		const [dx, dy] = step(s.charAt(i));
		[x, y] = [x + dx, y + dy];
		if (i >= k) {
			const [ox, oy] = step(s.charAt(i - k));
			[x, y] = [x - ox, y - oy];
		}
		if (i >= k - 1) seen.add(`${x},${y}`);
	}
	return seen.size;
};
