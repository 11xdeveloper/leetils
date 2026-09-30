/**
 * 777. Swap Adjacent in LR String
 *
 * Strings of `L`, `R` and `X` can be changed by replacing `"XL"` with
 * `"LX"` or `"RX"` with `"XR"`. Returns whether `start` can become `result`.
 *
 * `L`s only move left and `R`s only move right, and neither can pass the
 * other. So the `L`s and `R`s must appear in the same order in both, each
 * `L` no further right in `result`, and each `R` no further left.
 *
 * @see https://leetcode.com/problems/swap-adjacent-in-lr-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * swapAdjacentInLrString("RXXLRXRXL", "XRLXXRRLX"); // true
 */
export const swapAdjacentInLrString = (
	start: string,
	result: string,
): boolean => {
	if (start.length !== result.length) return false;
	let j = 0;
	for (let i = 0; i < start.length; i++) {
		const piece = start.charAt(i);
		if (piece === "X") continue;
		while (j < result.length && result.charAt(j) === "X") j++;
		if (
			result.charAt(j) !== piece ||
			(piece === "L" && j > i) ||
			(piece === "R" && j < i)
		)
			return false;
		j++;
	}
	while (j < result.length && result.charAt(j) === "X") j++;
	return j === result.length;
};
