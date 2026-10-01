/**
 * 474. Ones and Zeroes
 *
 * Returns the size of the largest subset of the binary strings `strs` that
 * has at most `m` zeros and `n` ones in total.
 *
 * A 0/1 knapsack with two capacities: `best[i][j]` is the largest subset
 * using at most `i` zeros and `j` ones. Each string updates it from the
 * largest capacities down, so it's counted at most once.
 *
 * @see https://leetcode.com/problems/ones-and-zeroes/
 * @difficulty Medium
 * @timeComplexity O(k · m · n + total length) for k strings
 * @spaceComplexity O(m · n)
 *
 * @example
 * onesAndZeroes(["10", "0001", "111001", "1", "0"], 5, 3); // 4
 */
export const onesAndZeroes = (
	strs: readonly string[],
	m: number,
	n: number,
): number => {
	const best: number[][] = Array.from({ length: m + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);

	for (const str of strs) {
		let zeros = 0;
		for (const char of str) if (char === "0") zeros++;
		const ones = str.length - zeros;

		for (let i = m; i >= zeros; i--) {
			const row = best[i];
			if (!row) continue;
			for (let j = n; j >= ones; j--) {
				row[j] = Math.max(row[j] ?? 0, (best[i - zeros]?.[j - ones] ?? 0) + 1);
			}
		}
	}

	return best[m]?.[n] ?? 0;
};
