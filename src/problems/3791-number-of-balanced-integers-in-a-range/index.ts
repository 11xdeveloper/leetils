/**
 * 3791. Number of Balanced Integers in a Range
 *
 * An integer is balanced if the digits in its odd positions (from the
 * left, starting at 1) add up to the same as those in its even positions.
 * Counts the balanced integers from `low` to `high`.
 *
 * Digit DP for the count up to a bound, tracking the running difference
 * between the two sums; positions count from the first non-zero digit.
 *
 * @see https://leetcode.com/problems/number-of-balanced-integers-in-a-range/
 * @difficulty Hard
 * @timeComplexity O(log² n · 10)
 * @spaceComplexity O(log² n)
 *
 * @example
 * numberOfBalancedIntegersInARange(1, 100); // 9
 */
export const numberOfBalancedIntegersInARange = (
	low: number,
	high: number,
): number => {
	const upTo = (n: number): number => {
		if (n < 1) return 0;
		const digits = [...String(n)].map(Number);
		const length = digits.length;
		const memo = new Map<string, number>();
		// position: digits placed since the number started (0 before it starts).
		const go = (
			pos: number,
			position: number,
			difference: number,
			tight: boolean,
		): number => {
			if (pos === length) return position > 0 && difference === 0 ? 1 : 0;
			const key = `${pos},${position % 2},${position > 0},${difference}`;
			const cached = tight ? undefined : memo.get(key);
			if (cached !== undefined) return cached;
			let count = 0;
			const top = tight ? (digits[pos] ?? 9) : 9;
			for (let d = 0; d <= top; d++) {
				const started = position > 0 || d > 0;
				const next = started ? position + 1 : 0;
				const sign = next % 2 === 1 ? 1 : -1;
				count += go(
					pos + 1,
					next,
					started ? difference + sign * d : 0,
					tight && d === top,
				);
			}
			if (!tight) memo.set(key, count);
			return count;
		};
		return go(0, 0, 0, true);
	};
	return upTo(high) - upTo(low - 1);
};
