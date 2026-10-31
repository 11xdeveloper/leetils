/**
 * 2055. Plates Between Candles
 *
 * `s` is a row of plates `*` and candles `|`. For each query `[left,
 * right]`, counts the plates in that substring that have a candle on both
 * sides within it.
 *
 * Precompute plate prefix counts and each position's nearest candle on
 * either side; a query counts the plates between its innermost candles.
 *
 * @see https://leetcode.com/problems/plates-between-candles/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * platesBetweenCandles("**|**|***|", [[2, 5], [5, 9]]); // [2, 3]
 */
export const platesBetweenCandles = (
	s: string,
	queries: readonly (readonly number[])[],
): number[] => {
	const n = s.length;
	const plates = new Array<number>(n + 1).fill(0);
	const candleBefore = new Array<number>(n).fill(-1);
	const candleAfter = new Array<number>(n).fill(n);
	for (let i = 0; i < n; i++) {
		plates[i + 1] = (plates[i] ?? 0) + (s[i] === "*" ? 1 : 0);
		candleBefore[i] = s[i] === "|" ? i : (candleBefore[i - 1] ?? -1);
	}
	for (let i = n - 1; i >= 0; i--)
		candleAfter[i] = s[i] === "|" ? i : (candleAfter[i + 1] ?? n);
	return queries.map(([left = 0, right = 0]) => {
		const [first, last] = [candleAfter[left] ?? n, candleBefore[right] ?? -1];
		return first < last ? (plates[last] ?? 0) - (plates[first] ?? 0) : 0;
	});
};
