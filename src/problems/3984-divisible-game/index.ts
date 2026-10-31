const MOD = 1_000_000_007;

/**
 * 3984. Divisible Game
 *
 * Alice picks k > 1 and a subarray: elements divisible by k score for
 * her, the rest for Bob. Returns her best score difference times the
 * smallest k achieving it, modulo 1e9+7.
 *
 * If k works, so does any prime factor of k, and at least as well (more
 * elements become hers), so only primes need trying, plus 2 when nothing
 * is divisible. For each, Kadane's algorithm finds the best subarray.
 *
 * @see https://leetcode.com/problems/divisible-game/
 * @difficulty Medium
 * @timeComplexity O(n · ω(V) · n + V log log V), for ω distinct primes
 * @spaceComplexity O(V)
 *
 * @example
 * divisibleGame([1, 4, 6, 8]); // 36
 */
export const divisibleGame = (nums: readonly number[]): number => {
	const limit = Math.max(...nums);
	const smallest = new Int32Array(limit + 1);
	for (let p = 2; p <= limit; p++)
		if (!smallest[p])
			for (let x = p; x <= limit; x += p) if (!smallest[x]) smallest[x] = p;
	const primes = new Set<number>([2]);
	for (const num of nums)
		for (let x = num; x > 1; ) {
			const p = smallest[x] ?? x;
			primes.add(p);
			while (x % p === 0) x /= p;
		}
	let [bestDifference, bestK] = [Number.NEGATIVE_INFINITY, 2];
	for (const k of [...primes].sort((a, b) => a - b)) {
		let [current, best] = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
		for (const num of nums) {
			current = Math.max(current, 0) + (num % k === 0 ? num : -num);
			best = Math.max(best, current);
		}
		if (best > bestDifference) [bestDifference, bestK] = [best, k];
	}
	return ((((bestDifference % MOD) * bestK) % MOD) + MOD) % MOD;
};
