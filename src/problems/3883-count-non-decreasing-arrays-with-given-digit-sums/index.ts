const MOD = 1_000_000_007;

/**
 * 3883. Count Non Decreasing Arrays With Given Digit Sums
 *
 * Counts non-decreasing arrays of numbers from 0 to 5000 where element i
 * has digit sum `digitSum[i]`, modulo 1e9+7.
 *
 * Group 0 to 5000 by digit sum. Count arrays by their last value: each
 * candidate for element i adds up the counts for candidates of element
 * i - 1 no larger, a running sum over both sorted lists.
 *
 * @see https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums/
 * @difficulty Hard
 * @timeComplexity O(n · V)
 * @spaceComplexity O(V)
 *
 * @example
 * countNonDecreasingArraysWithGivenDigitSums([25, 1]); // 6
 */
export const countNonDecreasingArraysWithGivenDigitSums = (
	digitSum: readonly number[],
): number => {
	const byDigitSum: number[][] = Array.from({ length: 64 }, () => []);
	for (let x = 0; x <= 5000; x++)
		byDigitSum[[...String(x)].reduce((s, d) => s + Number(d), 0)]?.push(x);
	let values: number[] = [-1];
	let ways = [1];
	for (const target of digitSum) {
		const candidates = byDigitSum[target] ?? [];
		const next: number[] = [];
		let [at, running] = [0, 0];
		for (const x of candidates) {
			while (at < values.length && (values[at] ?? 0) <= x)
				running = (running + (ways[at++] ?? 0)) % MOD;
			next.push(running);
		}
		[values, ways] = [candidates, next];
	}
	return ways.reduce((a, b) => (a + b) % MOD, 0);
};
