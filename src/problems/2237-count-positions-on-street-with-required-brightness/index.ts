/**
 * 2237. Count Positions on Street With Required Brightness
 *
 * Lights `[position, range]` light `[position - range, position + range]`
 * of a street of positions `0..n-1`. Counts the positions lit by at least
 * `requirement[i]` lights.
 *
 * Add each light's range to a difference array clamped to the street,
 * then sweep.
 *
 * @see https://leetcode.com/problems/count-positions-on-street-with-required-brightness/
 * @difficulty Medium
 * @timeComplexity O(n + l)
 * @spaceComplexity O(n)
 *
 * @example
 * countPositionsOnStreetWithRequiredBrightness(5, [[0, 1], [2, 1], [3, 2]], [0, 2, 1, 4, 1]); // 4
 */
export const countPositionsOnStreetWithRequiredBrightness = (
	n: number,
	lights: readonly (readonly number[])[],
	requirement: readonly number[],
): number => {
	const change = new Array<number>(n + 1).fill(0);
	for (const [position = 0, range = 0] of lights) {
		const [start, end] = [
			Math.max(0, position - range),
			Math.min(n - 1, position + range),
		];
		change[start] = (change[start] ?? 0) + 1;
		change[end + 1] = (change[end + 1] ?? 0) - 1;
	}
	let [brightness, count] = [0, 0];
	for (let i = 0; i < n; i++) {
		brightness += change[i] ?? 0;
		if (brightness >= (requirement[i] ?? 0)) count++;
	}
	return count;
};
