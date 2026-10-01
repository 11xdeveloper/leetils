const MOD = 1_000_000_007n;

/**
 * 1830. Minimum Number of Operations to Make String Sorted
 *
 * Each operation applies the "previous permutation" step to `s`. Returns
 * how many operations sort it, modulo 10^9 + 7.
 *
 * Each operation moves to the previous distinct permutation, so the answer
 * is the number of distinct permutations smaller than `s`: for each
 * position, count the arrangements of the remaining letters that start
 * with a smaller letter (multinomial coefficients via factorials and
 * modular inverses).
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted/
 * @difficulty Hard
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMakeStringSorted("cba"); // 5
 */
export const minimumNumberOfOperationsToMakeStringSorted = (
	s: string,
): number => {
	const n = s.length;
	const power = (base: bigint, exponent: bigint) => {
		let [result, square, rest] = [1n, base % MOD, exponent];
		for (; rest > 0n; rest >>= 1n) {
			if (rest & 1n) result = (result * square) % MOD;
			square = (square * square) % MOD;
		}
		return result;
	};
	const factorial = [1n];
	for (let i = 1; i <= n; i++)
		factorial.push(((factorial[i - 1] ?? 1n) * BigInt(i)) % MOD);
	const inverse = factorial.map((value) => power(value, MOD - 2n));
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < n; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	let operations = 0n;
	for (let i = 0; i < n; i++) {
		const letter = s.charCodeAt(i) - 97;
		// Arrangements of the remaining letters: (rest)! / Π count!.
		let arrangements = factorial[n - 1 - i] ?? 1n;
		for (const count of counts)
			arrangements = (arrangements * (inverse[count] ?? 1n)) % MOD;
		for (let smaller = 0; smaller < letter; smaller++) {
			// Fixing a smaller letter first multiplies by its count.
			operations =
				(operations + arrangements * BigInt(counts[smaller] ?? 0)) % MOD;
		}
		counts[letter] = (counts[letter] ?? 0) - 1;
	}
	return Number(operations);
};
