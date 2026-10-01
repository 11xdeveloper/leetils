/**
 * 1652. Defuse the Bomb
 *
 * Replaces each element of the circular `code` by the sum of the next `k`
 * elements when `k > 0`, the previous `−k` when `k < 0`, or 0.
 *
 * A sliding window of `|k|` elements moving around the circle.
 *
 * @see https://leetcode.com/problems/defuse-the-bomb/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * defuseTheBomb([5, 7, 1, 4], 3); // [12, 10, 16, 13]
 */
export const defuseTheBomb = (code: readonly number[], k: number): number[] => {
	const n = code.length;
	if (k === 0) return new Array<number>(n).fill(0);
	const at = (i: number) => code[((i % n) + n) % n] ?? 0;
	// The window for index i covers [i + start, i + start + |k|).
	const start = k > 0 ? 1 : k;
	let sum = 0;
	for (let j = start; j < start + Math.abs(k); j++) sum += at(j);
	const result: number[] = [];
	for (let i = 0; i < n; i++) {
		result.push(sum);
		sum += at(i + start + Math.abs(k)) - at(i + start);
	}
	return result;
};
