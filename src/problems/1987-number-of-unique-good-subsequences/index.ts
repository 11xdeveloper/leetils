/**
 * 1987. Number of Unique Good Subsequences
 *
 * Counts the distinct non-empty subsequences of the binary string `binary`
 * without leading zeros ("0" itself counts), modulo 10^9 + 7.
 *
 * Track the distinct subsequences starting with 1 that end in 0 and in 1.
 * Appending a digit extends every one of them to end in that digit (a
 * new 1 can also start one), which replaces the old count for that ending.
 *
 * @see https://leetcode.com/problems/number-of-unique-good-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfUniqueGoodSubsequences("101"); // 5
 */
export const numberOfUniqueGoodSubsequences = (binary: string): number => {
	const MOD = 1_000_000_007;
	let [endsZero, endsOne, hasZero] = [0, 0, false];
	for (const char of binary) {
		if (char === "1") endsOne = (endsZero + endsOne + 1) % MOD;
		else {
			endsZero = (endsZero + endsOne) % MOD;
			hasZero = true;
		}
	}
	return (endsZero + endsOne + (hasZero ? 1 : 0)) % MOD;
};
