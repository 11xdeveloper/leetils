/**
 * 793. Preimage Size of Factorial Zeroes Function
 *
 * `f(x)` is the number of trailing zeros of `x!`. Returns how many
 * non-negative integers `x` have `f(x) = k`.
 *
 * `f` never decreases and only changes at multiples of 5, so every value it
 * takes is taken by exactly 5 consecutive integers, and some values are
 * skipped. Binary search for the smallest `x` with `f(x) ≥ k` shows which.
 *
 * @see https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function/
 * @difficulty Hard
 * @timeComplexity O(log^2 k)
 * @spaceComplexity O(1)
 *
 * @example
 * preimageSizeOfFactorialZeroesFunction(5); // 0: 24! has 4 zeros and 25! has 6
 */
export const preimageSizeOfFactorialZeroesFunction = (k: number): number => {
	const zeros = (x: number): number => {
		let count = 0;
		for (let power = 5; power <= x; power *= 5) count += Math.floor(x / power);
		return count;
	};

	let low = 0;
	let high = 5 * (k + 1);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (zeros(mid) < k) low = mid + 1;
		else high = mid;
	}
	return zeros(low) === k ? 5 : 0;
};
