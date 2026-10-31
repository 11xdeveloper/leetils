/**
 * 2381. Shifting Letters II
 *
 * Each shift `[start, end, direction]` moves the letters in that range one
 * step forward (1) or back (0) in the alphabet, wrapping around. Returns
 * the string after all shifts.
 *
 * Accumulate the shifts in a difference array.
 *
 * @see https://leetcode.com/problems/shifting-letters-ii/
 * @difficulty Medium
 * @timeComplexity O(n + s)
 * @spaceComplexity O(n)
 *
 * @example
 * shiftingLettersII("abc", [[0, 1, 0], [1, 2, 1], [0, 2, 1]]); // "ace"
 */
export const shiftingLettersII = (
	s: string,
	shifts: readonly (readonly number[])[],
): string => {
	const change = new Array<number>(s.length + 1).fill(0);
	for (const [start = 0, end = 0, direction = 0] of shifts) {
		const step = direction ? 1 : -1;
		change[start] = (change[start] ?? 0) + step;
		change[end + 1] = (change[end + 1] ?? 0) - step;
	}
	let shift = 0;
	return Array.from(s, (char, i) => {
		shift += change[i] ?? 0;
		const code = (((char.charCodeAt(0) - 97 + shift) % 26) + 26) % 26;
		return String.fromCharCode(97 + code);
	}).join("");
};
