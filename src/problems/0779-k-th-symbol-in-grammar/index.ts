/**
 * 779. K-th Symbol in Grammar
 *
 * Row 1 is `0`, and each later row replaces every 0 in the row before with
 * `01` and every 1 with `10`. Returns the `k`th symbol (from 1) of row `n`.
 *
 * Each symbol's two children are itself and its flip. Following the path
 * down from the root, the symbol at `k` has been flipped once for every
 * right branch, which is every 1 bit of `k - 1`.
 *
 * @see https://leetcode.com/problems/k-th-symbol-in-grammar/
 * @difficulty Medium
 * @timeComplexity O(log k)
 * @spaceComplexity O(1)
 *
 * @example
 * kThSymbolInGrammar(2, 2); // 1
 */
export const kThSymbolInGrammar = (_n: number, k: number): number => {
	let flips = 0;
	for (let bits = k - 1; bits > 0; bits = Math.floor(bits / 2))
		flips += bits % 2;
	return flips % 2;
};
