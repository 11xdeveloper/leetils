const MOD = 1_000_000_007;

/**
 * 2719. Count of Integers
 *
 * Returns how many integers between the decimal strings `num1` and
 * `num2` inclusive have a digit sum in `[min_sum, max_sum]`, modulo
 * 1e9 + 7.
 *
 * Digit DP counting numbers up to a bound by digit sum; the answer is the
 * count up to `num2` minus the count up to `num1`, plus `num1` itself if
 * it qualifies.
 *
 * @see https://leetcode.com/problems/count-of-integers/
 * @difficulty Hard
 * @timeComplexity O(d · S · 10), where `d` is the digit count and `S` is `max_sum`
 * @spaceComplexity O(S)
 *
 * @example
 * countOfIntegers("1", "12", 1, 8); // 11
 */
export const countOfIntegers = (
	num1: string,
	num2: string,
	min_sum: number,
	max_sum: number,
): number => {
	/** Numbers from 0 to `bound` with a digit sum in range. */
	const upTo = (bound: string): number => {
		// free[s]: ways for the digits so far to sum to s while already below the bound.
		let free = Array.from({ length: max_sum + 1 }, () => 0);
		let tightSum = 0;
		for (const char of bound) {
			const digit = Number(char);
			const next = Array.from({ length: max_sum + 1 }, () => 0);
			for (let s = 0; s <= max_sum; s++) {
				const ways = free[s] ?? 0;
				if (ways === 0) continue;
				for (let d = 0; d <= 9 && s + d <= max_sum; d++)
					next[s + d] = ((next[s + d] ?? 0) + ways) % MOD;
			}
			for (let d = 0; d < digit && tightSum + d <= max_sum; d++)
				next[tightSum + d] = ((next[tightSum + d] ?? 0) + 1) % MOD;
			tightSum += digit;
			free = next;
		}
		let total = tightSum >= min_sum && tightSum <= max_sum ? 1 : 0;
		for (let s = min_sum; s <= max_sum; s++)
			total = (total + (free[s] ?? 0)) % MOD;
		return total;
	};
	let digitSum = 0;
	for (const char of num1) digitSum += Number(char);
	const ownCount = digitSum >= min_sum && digitSum <= max_sum ? 1 : 0;
	return (((upTo(num2) - upTo(num1) + ownCount) % MOD) + MOD) % MOD;
};
