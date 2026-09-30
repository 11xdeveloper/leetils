/**
 * 1067. Digit Count in Range
 *
 * Counts how many times the digit `d` appears across all integers from
 * `low` to `high`.
 *
 * Counts occurrences in 1 to `n` position by position: for each place, the
 * numbers split into a higher part, the digit at that place and a lower
 * part, which gives a formula. For `d = 0`, the leading position can't be 0,
 * so one fewer higher-part value is counted.
 *
 * @see https://leetcode.com/problems/digit-count-in-range/
 * @difficulty Hard
 * @timeComplexity O(log high)
 * @spaceComplexity O(1)
 *
 * @example
 * digitCountInRange(1, 1, 13); // 6
 */
export const digitCountInRange = (
	d: number,
	low: number,
	high: number,
): number => {
	const upTo = (n: number): number => {
		let count = 0;
		for (let place = 1; place <= n; place *= 10) {
			const higher = Math.floor(n / (place * 10));
			const current = Math.floor(n / place) % 10;
			const lower = n % place;
			if (d === 0) {
				if (higher === 0) continue;
				count += (higher - 1) * place + (current > 0 ? place : lower + 1);
			} else {
				count +=
					higher * place +
					(current > d ? place : current === d ? lower + 1 : 0);
			}
		}
		return count;
	};
	return upTo(high) - upTo(low - 1);
};
