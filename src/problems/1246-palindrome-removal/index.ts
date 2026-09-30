/**
 * 1246. Palindrome Removal
 *
 * A move removes a palindromic subarray, closing the gap. Returns the fewest
 * moves to remove everything from `arr`.
 *
 * Interval dynamic programming: `moves[i][j]` is the fewest moves for
 * `arr[i … j]`. Either `arr[i]` goes on its own (1 + the rest), or it's
 * removed together with an equal `arr[k]`, riding along with the last
 * palindrome removed from between them (so costing nothing extra when that
 * part is non-empty), then `arr[k + 1 … j]` separately.
 *
 * @see https://leetcode.com/problems/palindrome-removal/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * palindromeRemoval([1, 3, 4, 1, 5]); // 3
 */
export const palindromeRemoval = (arr: readonly number[]): number => {
	const n = arr.length;
	const moves = Array.from({ length: n + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	const at = (i: number, j: number) => (i > j ? 0 : (moves[i]?.[j] ?? 0));
	for (let i = n - 1; i >= 0; i--) {
		const row = moves[i] ?? [];
		for (let j = i; j < n; j++) {
			let fewest = 1 + at(i + 1, j);
			for (let k = i + 1; k <= j; k++) {
				if (arr[k] !== arr[i]) continue;
				const inside = k === i + 1 ? 1 : at(i + 1, k - 1);
				fewest = Math.min(fewest, inside + at(k + 1, j));
			}
			row[j] = fewest;
		}
	}
	return at(0, n - 1);
};
