/**
 * 3143. Maximum Points Inside the Square
 *
 * Points are tagged with letters `s[i]`. Returns the most points inside (or
 * on) an axis-aligned square centred on the origin that holds no two points
 * with the same tag.
 *
 * A point's distance is max(|x|, |y|). The square must stay smaller than
 * every tag's second-closest point, so take the smallest such distance as
 * the limit and count the points strictly inside it.
 *
 * @see https://leetcode.com/problems/maximum-points-inside-the-square/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumPointsInsideTheSquare([[2, 2], [-1, -2], [-4, 4], [-3, 1], [3, -3]], "abdca"); // 2
 */
export const maximumPointsInsideTheSquare = (
	points: readonly (readonly number[])[],
	s: string,
): number => {
	const closest = new Array<number>(26).fill(Number.POSITIVE_INFINITY);
	let limit = Number.POSITIVE_INFINITY;
	const distance = points.map(([x = 0, y = 0]) =>
		Math.max(Math.abs(x), Math.abs(y)),
	);
	distance.forEach((d, i) => {
		const tag = s.charCodeAt(i) - 97;
		const first = closest[tag] ?? Number.POSITIVE_INFINITY;
		if (d < first) {
			limit = Math.min(limit, first);
			closest[tag] = d;
		} else limit = Math.min(limit, d);
	});
	return distance.filter((d) => d < limit).length;
};
