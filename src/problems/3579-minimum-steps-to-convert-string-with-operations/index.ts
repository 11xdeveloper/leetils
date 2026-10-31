/**
 * 3579. Minimum Steps to Convert String with Operations
 *
 * Split `word1` into substrings; within each, replace a letter, swap two
 * letters, or reverse the whole substring, with each index used at most
 * once per kind of operation. Returns the fewest operations that turn
 * `word1` into `word2`.
 *
 * A substring's cost, reversed (one extra operation) or not, comes from its
 * mismatches: a mismatch a→b pairs with a b→a one for one swap, and the
 * rest need a replacement each. Then split by dynamic programming.
 *
 * @see https://leetcode.com/problems/minimum-steps-to-convert-string-with-operations/
 * @difficulty Hard
 * @timeComplexity O(n³)
 * @spaceComplexity O(n + σ²)
 *
 * @example
 * minimumStepsToConvertStringWithOperations("abcdf", "dacbe"); // 4
 */
export const minimumStepsToConvertStringWithOperations = (
	word1: string,
	word2: string,
): number => {
	const n = word1.length;
	const cost = (i: number, j: number, reversed: boolean): number => {
		const pending = new Map<string, number>();
		let operations = reversed ? 1 : 0;
		for (let t = i; t < j; t++) {
			const from = word1.charAt(reversed ? i + j - 1 - t : t);
			const to = word2.charAt(t);
			if (from === to) continue;
			const partner = `${to}${from}`;
			const waiting = pending.get(partner) ?? 0;
			if (waiting > 0) pending.set(partner, waiting - 1);
			else {
				pending.set(`${from}${to}`, (pending.get(`${from}${to}`) ?? 0) + 1);
				operations++;
			}
		}
		return operations;
	};
	const best = [0];
	for (let j = 1; j <= n; j++) {
		let value = Number.POSITIVE_INFINITY;
		for (let i = 0; i < j; i++)
			value = Math.min(
				value,
				(best[i] ?? 0) + Math.min(cost(i, j, false), cost(i, j, true)),
			);
		best.push(value);
	}
	return best[n] ?? 0;
};
