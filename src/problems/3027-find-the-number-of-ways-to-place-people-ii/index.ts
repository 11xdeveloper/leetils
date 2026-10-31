/**
 * 3027. Find the Number of Ways to Place People II
 *
 * Count pairs of points where Alice's point is above and to the left of
 * Bob's (ties allowed, but not the same point) and no other point lies in
 * or on the rectangle between them.
 *
 * Sort by x, breaking ties by y descending, so Bob always comes after
 * Alice. For each Alice, scan the later points: a point at or below her
 * pairs with her only if it's higher than every such point seen so far,
 * since otherwise that point would sit in the rectangle.
 *
 * @see https://leetcode.com/problems/find-the-number-of-ways-to-place-people-ii/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheNumberOfWaysToPlacePeopleII([[6, 2], [4, 4], [2, 6]]); // 2
 */
export const findTheNumberOfWaysToPlacePeopleII = (
	points: readonly (readonly number[])[],
): number => {
	const sorted = points.toSorted(
		(p, q) => (p[0] ?? 0) - (q[0] ?? 0) || (q[1] ?? 0) - (p[1] ?? 0),
	);
	let pairs = 0;
	for (let i = 0; i < sorted.length; i++) {
		const top = sorted[i]?.[1] ?? 0;
		let highest = Number.NEGATIVE_INFINITY;
		for (let j = i + 1; j < sorted.length; j++) {
			const y = sorted[j]?.[1] ?? 0;
			if (y <= top && y > highest) {
				pairs++;
				highest = y;
			}
		}
	}
	return pairs;
};
