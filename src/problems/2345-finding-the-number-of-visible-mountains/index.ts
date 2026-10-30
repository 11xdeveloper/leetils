/**
 * 2345. Finding the Number of Visible Mountains
 *
 * Mountain `[x, y]` is a right isosceles triangle with peak `(x, y)` and
 * base on the x-axis. Counts the mountains whose peak is not inside or on
 * another mountain.
 *
 * A mountain is the base interval `[x - y, x + y]`, hidden exactly when
 * another's interval contains it. Sort by left end (wider first) and
 * track the furthest right end so far; identical mountains hide each
 * other.
 *
 * @see https://leetcode.com/problems/finding-the-number-of-visible-mountains/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findingTheNumberOfVisibleMountains([[2, 2], [6, 3], [5, 4]]); // 2
 */
export const findingTheNumberOfVisibleMountains = (
	peaks: readonly (readonly number[])[],
): number => {
	const intervals = peaks
		.map(([x = 0, y = 0]) => [x - y, x + y] as const)
		.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
	let [visible, reach] = [0, -Infinity];
	for (const [i, [left, right]] of intervals.entries()) {
		const next = intervals[i + 1];
		const duplicate = next?.[0] === left && next[1] === right;
		if (right > reach && !duplicate) visible++;
		reach = Math.max(reach, right);
	}
	return visible;
};
