/**
 * 546. Remove Boxes
 *
 * Each round removes a run of `k` adjacent boxes of the same colour for
 * `k²` points, and the boxes either side close the gap. Returns the most
 * points for removing all the boxes.
 *
 * `best(l, r, k)` is the most points for `boxes[l..r]` when `k` more boxes
 * the colour of `boxes[l]` are waiting to join it on the left. Either
 * `boxes[l]` goes now with them, or the boxes up to some later box of the
 * same colour are cleared first so `boxes[l]` and its group join that box.
 * Results are memoised in a flat array.
 *
 * @see https://leetcode.com/problems/remove-boxes/
 * @difficulty Hard
 * @timeComplexity O(n^4)
 * @spaceComplexity O(n^3)
 *
 * @example
 * removeBoxes([1, 3, 2, 2, 2, 3, 4, 3, 1]); // 23
 */
export const removeBoxes = (boxes: readonly number[]): number => {
	const n = boxes.length;
	const memo = new Int32Array(n * n * n).fill(-1);

	const best = (l: number, r: number, k: number): number => {
		if (l > r) return 0;
		// Boxes right after l with the same colour join the waiting group.
		while (l < r && boxes[l + 1] === boxes[l]) {
			l++;
			k++;
		}
		const key = (l * n + r) * n + k;
		const known = memo[key] ?? -1;
		if (known >= 0) return known;

		let points = (k + 1) ** 2 + best(l + 1, r, 0);
		for (let m = l + 2; m <= r; m++) {
			if (boxes[m] === boxes[l] && boxes[m - 1] !== boxes[l]) {
				points = Math.max(points, best(l + 1, m - 1, 0) + best(m, r, k + 1));
			}
		}

		memo[key] = points;
		return points;
	};

	return best(0, n - 1, 0);
};
