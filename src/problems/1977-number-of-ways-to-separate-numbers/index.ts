/**
 * 1977. Number of Ways to Separate Numbers
 *
 * Counts the ways to split the digit string `num` into a non-decreasing
 * list of positive integers without leading zeros, modulo 10^9 + 7.
 *
 * `ways[i][l]` counts splits of the first `i` digits whose last number has
 * length at most `l`. The last number `num[i − l … i)` can follow any
 * shorter previous number, or one of equal length that isn't larger, which
 * a table of longest common prefixes compares in constant time.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-separate-numbers/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * numberOfWaysToSeparateNumbers("327"); // 2
 */
export const numberOfWaysToSeparateNumbers = (num: string): number => {
	const MOD = 1_000_000_007;
	const n = num.length;
	// common[i · (n + 1) + j]: the length of the common prefix of num[i …] and num[j …].
	const common = new Int16Array((n + 1) * (n + 1));
	for (let i = n - 1; i >= 0; i--) {
		for (let j = n - 1; j > i; j--) {
			if (num[i] === num[j])
				common[i * (n + 1) + j] = (common[(i + 1) * (n + 1) + j + 1] ?? 0) + 1;
		}
	}
	/** Whether num[a … a + l) ≤ num[b … b + l), for a < b. */
	const notLarger = (a: number, b: number, l: number) => {
		const shared = common[a * (n + 1) + b] ?? 0;
		return shared >= l || (num[a + shared] ?? "") < (num[b + shared] ?? "");
	};
	// ways[i · (n + 1) + l], with ways[0][l] = 1 for the empty prefix.
	const ways = new Int32Array((n + 1) * (n + 1));
	for (let l = 0; l <= n; l++) ways[l] = 1;
	for (let i = 1; i <= n; i++) {
		for (let l = 1; l <= i; l++) {
			const start = i - l;
			let exactly = 0;
			if (num[start] !== "0") {
				if (start === 0) exactly = 1;
				else {
					// Previous numbers shorter than l, plus one of length l if it isn't larger.
					exactly = ways[start * (n + 1) + Math.min(l - 1, start)] ?? 0;
					if (start >= l && notLarger(start - l, start, l)) {
						exactly =
							(exactly +
								(ways[start * (n + 1) + l] ?? 0) -
								(ways[start * (n + 1) + l - 1] ?? 0) +
								MOD) %
							MOD;
					}
				}
			}
			ways[i * (n + 1) + l] =
				((ways[i * (n + 1) + l - 1] ?? 0) + exactly) % MOD;
		}
	}
	return ways[n * (n + 1) + n] ?? 0;
};
