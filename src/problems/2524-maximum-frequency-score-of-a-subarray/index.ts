const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
		if (exponent % 2 === 1) result = multiply(result, base);
		base = multiply(base, base);
	}
	return result;
};

/**
 * 2524. Maximum Frequency Score of a Subarray
 *
 * A subarray's frequency score is the sum, over its distinct values, of
 * each value raised to its frequency, taken modulo 1e9 + 7. Returns the
 * largest score of a subarray of length `k`.
 *
 * Slide the window, swapping a value's term for the next or previous
 * power as its frequency changes.
 *
 * @see https://leetcode.com/problems/maximum-frequency-score-of-a-subarray/
 * @difficulty Hard
 * @timeComplexity O(n log k)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumFrequencyScoreOfASubarray([1, 1, 1, 2, 1, 2], 3); // 5
 */
export const maximumFrequencyScoreOfASubarray = (
	nums: readonly number[],
	k: number,
): number => {
	const frequency = new Map<number, number>();
	let score = 0;
	const shift = (value: number, change: number): void => {
		const before = frequency.get(value) ?? 0;
		const after = before + change;
		frequency.set(value, after);
		const oldTerm = before > 0 ? power(value, before) : 0;
		const newTerm = after > 0 ? power(value, after) : 0;
		score = (((score - oldTerm + newTerm) % MOD) + MOD) % MOD;
	};

	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		shift(nums[i] ?? 0, 1);
		if (i >= k) shift(nums[i - k] ?? 0, -1);
		if (i >= k - 1) best = Math.max(best, score);
	}
	return best;
};
