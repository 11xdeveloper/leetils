/**
 * 1247. Minimum Swaps to Make Strings Equal
 *
 * `s1` and `s2` are equal-length strings of `x`s and `y`s. A swap exchanges
 * a character of `s1` with one of `s2`. Returns the fewest swaps to make
 * them equal, or -1 if it can't be done.
 *
 * Only mismatched positions matter: `xy` ones (`x` in `s1`, `y` in `s2`)
 * and `yx` ones. Two `xy`s are fixed by one swap, as are two `yx`s; a
 * leftover `xy` and `yx` take two. An odd total can't be fixed.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-make-strings-equal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSwapsToMakeStringsEqual("xy", "yx"); // 2
 */
export const minimumSwapsToMakeStringsEqual = (
	s1: string,
	s2: string,
): number => {
	let [xy, yx] = [0, 0];
	for (let i = 0; i < s1.length; i++) {
		if (s1[i] === "x" && s2[i] === "y") xy++;
		else if (s1[i] === "y" && s2[i] === "x") yx++;
	}
	if ((xy + yx) % 2 === 1) return -1;
	return Math.floor(xy / 2) + Math.floor(yx / 2) + 2 * (xy % 2);
};
