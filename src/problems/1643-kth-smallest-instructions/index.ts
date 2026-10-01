/**
 * 1643. Kth Smallest Instructions
 *
 * Returns the `k`-th (1-indexed) lexicographically smallest string of
 * moves `H` (right) and `V` (down) reaching `destination = [row, column]`
 * from the origin.
 *
 * Choose letters one at a time. Starting with `H` leaves `C(h − 1 + v, v)`
 * strings; if `k` is no larger, take `H`, otherwise skip past all of them
 * and take `V`.
 *
 * @see https://leetcode.com/problems/kth-smallest-instructions/
 * @difficulty Hard
 * @timeComplexity O((h + v)^2)
 * @spaceComplexity O((h + v)^2)
 *
 * @example
 * kthSmallestInstructions([2, 3], 2); // "HHVHV"
 */
export const kthSmallestInstructions = (
	destination: readonly number[],
	k: number,
): string => {
	let [v, h] = [destination[0] ?? 0, destination[1] ?? 0];
	const choose: number[][] = [];
	for (let n = 0; n <= h + v; n++) {
		choose.push(
			Array.from({ length: n + 1 }, (_, r) =>
				r === 0 || r === n
					? 1
					: (choose[n - 1]?.[r - 1] ?? 0) + (choose[n - 1]?.[r] ?? 0),
			),
		);
	}
	let rest = k;
	let moves = "";
	while (h > 0 || v > 0) {
		const startingWithH = h > 0 ? (choose[h - 1 + v]?.[v] ?? 0) : 0;
		if (rest <= startingWithH) {
			moves += "H";
			h--;
		} else {
			rest -= startingWithH;
			moves += "V";
			v--;
		}
	}
	return moves;
};
