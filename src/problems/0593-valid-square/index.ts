/**
 * 593. Valid Square
 *
 * Returns whether the four points, in any order, are the corners of a
 * square with a positive side length.
 *
 * Four points form a square exactly when, of the six distances between
 * pairs, the four smallest are equal and positive (the sides) and the other
 * two are equal (the diagonals). Squared distances keep everything in
 * integers.
 *
 * @see https://leetcode.com/problems/valid-square/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * validSquare([0, 0], [1, 1], [1, 0], [0, 1]); // true
 */
export const validSquare = (
	p1: readonly number[],
	p2: readonly number[],
	p3: readonly number[],
	p4: readonly number[],
): boolean => {
	const points = [p1, p2, p3, p4];
	const distances: number[] = [];
	for (let i = 0; i < 4; i++) {
		for (let j = i + 1; j < 4; j++) {
			const [x1 = 0, y1 = 0] = points[i] ?? [];
			const [x2 = 0, y2 = 0] = points[j] ?? [];
			distances.push((x1 - x2) ** 2 + (y1 - y2) ** 2);
		}
	}
	distances.sort((a, b) => a - b);

	const [side = 0] = distances;
	return (
		side > 0 &&
		distances[3] === side &&
		distances[4] === distances[5] &&
		(distances[4] ?? 0) > side
	);
};
