const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3333. Find the Original Typed String II
 *
 * Alice may have held keys down too long any number of times. Returns how
 * many strings of at least `k` letters she might have meant to type,
 * modulo 10⁹ + 7.
 *
 * Each run of a repeated letter could have been meant as 1 up to its full
 * length, so there are Π lengths possibilities. With at least `k` runs they
 * all work; otherwise subtract the ones shorter than `k`, counted by
 * dynamic programming over the runs with prefix sums.
 *
 * @see https://leetcode.com/problems/find-the-original-typed-string-ii/
 * @difficulty Hard
 * @timeComplexity O(n + r · k), for r runs
 * @spaceComplexity O(k)
 *
 * @example
 * findTheOriginalTypedStringII("aabbccdd", 7); // 5
 */
export const findTheOriginalTypedStringII = (
	word: string,
	k: number,
): number => {
	const runs: number[] = [];
	for (let i = 0; i < word.length; ) {
		let j = i;
		while (j < word.length && word[j] === word[i]) j++;
		runs.push(j - i);
		i = j;
	}
	let total = 1;
	for (const run of runs) total = multiply(total, run);
	if (runs.length >= k) return total;
	// ways[length]: choices for the runs so far with that total length.
	let ways = new Array<number>(k).fill(0);
	ways[0] = 1;
	for (const run of runs) {
		const prefix = [0];
		for (const count of ways) prefix.push(((prefix.at(-1) ?? 0) + count) % MOD);
		ways = ways.map((_, length) => {
			const low = Math.max(0, length - run);
			return ((prefix[length] ?? 0) - (prefix[low] ?? 0) + MOD) % MOD;
		});
	}
	const short = ways.reduce((sum, count) => (sum + count) % MOD, 0);
	return (total - short + MOD) % MOD;
};
