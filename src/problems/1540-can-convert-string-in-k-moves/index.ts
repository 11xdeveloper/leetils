/**
 * 1540. Can Convert String in K Moves
 *
 * On move `i` (from 1 to `k`) one unused position of `s` may be shifted
 * forward `i` letters (wrapping). Returns whether `s` can become `t`.
 *
 * A position needing a shift of `d` (1–25) can use move `d`, `d + 26`,
 * `d + 52`, … The `c`th position needing shift `d` must wait for move
 * `d + 26(c − 1)`, which has to be at most `k`.
 *
 * @see https://leetcode.com/problems/can-convert-string-in-k-moves/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 shifts
 *
 * @example
 * canConvertStringInKMoves("aab", "bbb", 27); // true
 */
export const canConvertStringInKMoves = (
	s: string,
	t: string,
	k: number,
): boolean => {
	if (s.length !== t.length) return false;
	const used = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++) {
		const shift = (t.charCodeAt(i) - s.charCodeAt(i) + 26) % 26;
		if (shift === 0) continue;
		if (shift + 26 * (used[shift] ?? 0) > k) return false;
		used[shift] = (used[shift] ?? 0) + 1;
	}
	return true;
};
