/**
 * 1499. Max Value of Equation
 *
 * `points` are sorted by strictly increasing `x`. Returns the largest
 * `y_i + y_j + |x_i − x_j|` over pairs `i < j` with `x_j − x_i ≤ k`.
 *
 * For `i < j` the value is `(y_i − x_i) + (y_j + x_j)`, so each point wants
 * the largest `y_i − x_i` among earlier points within `k`. A deque of
 * candidates with decreasing `y − x` gives that sliding-window maximum.
 *
 * @see https://leetcode.com/problems/max-value-of-equation/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maxValueOfEquation([[1, 3], [2, 0], [5, 10], [6, -10]], 1); // 4
 */
export const maxValueOfEquation = (
	points: readonly (readonly number[])[],
	k: number,
): number => {
	const window: number[] = [];
	let front = 0;
	let best = -Infinity;
	const score = (i: number | undefined) => {
		const [x = 0, y = 0] = points[i ?? 0] ?? [];
		return y - x;
	};
	points.forEach(([x = 0, y = 0], j) => {
		while (
			front < window.length &&
			x - (points[window[front] ?? 0]?.[0] ?? 0) > k
		)
			front++;
		if (front < window.length)
			best = Math.max(best, score(window[front]) + y + x);
		while (window.length > front && score(window.at(-1)) <= y - x) window.pop();
		window.push(j);
	});
	return best;
};
