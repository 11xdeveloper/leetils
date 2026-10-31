/**
 * 3361. Shift Distance Between Two Strings
 *
 * Shifting a letter forward costs `nextCost` for that letter and backward
 * costs `previousCost`, wrapping round. Returns the cheapest total cost to
 * turn `s` into `t`.
 *
 * For each pair, walk forwards or backwards round the alphabet, whichever
 * is cheaper. Precompute the costs between every pair of letters.
 *
 * @see https://leetcode.com/problems/shift-distance-between-two-strings/
 * @difficulty Medium
 * @timeComplexity O(n + 26³)
 * @spaceComplexity O(26²)
 *
 * @example
 * shiftDistanceBetweenTwoStrings("abab", "baba", [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // 2
 */
export const shiftDistanceBetweenTwoStrings = (
	s: string,
	t: string,
	nextCost: readonly number[],
	previousCost: readonly number[],
): number => {
	const cost = new Float64Array(26 * 26);
	for (let from = 0; from < 26; from++) {
		let forward = 0;
		for (let step = 0, at = from; step < 26; step++, at = (at + 1) % 26) {
			cost[from * 26 + at] = forward;
			forward += nextCost[at] ?? 0;
		}
		let backward = 0;
		for (let step = 0, at = from; step < 26; step++, at = (at + 25) % 26) {
			cost[from * 26 + at] = Math.min(cost[from * 26 + at] ?? 0, backward);
			backward += previousCost[at] ?? 0;
		}
	}
	let total = 0;
	for (let i = 0; i < s.length; i++)
		total += cost[(s.charCodeAt(i) - 97) * 26 + t.charCodeAt(i) - 97] ?? 0;
	return total;
};
