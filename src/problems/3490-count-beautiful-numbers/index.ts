/**
 * 3490. Count Beautiful Numbers
 *
 * How many numbers from `l` to `r` have a digit product divisible by their
 * digit sum.
 *
 * Count up to a bound with digit dynamic programming over (position, digit
 * sum, digit product, whether digits have started), memoising the states
 * not pinned to the bound. Products of digits take few distinct values.
 *
 * @see https://leetcode.com/problems/count-beautiful-numbers/
 * @difficulty Hard
 * @timeComplexity O(d · S · P · 10), for S sums and P distinct products
 * @spaceComplexity O(d · S · P)
 *
 * @example
 * countBeautifulNumbers(10, 20); // 2
 */
export const countBeautifulNumbers = (l: number, r: number): number => {
	const upTo = (bound: number): number => {
		const digits = String(bound);
		const memo = new Map<string, number>();
		const count = (
			position: number,
			sum: number,
			product: number,
			started: boolean,
			tight: boolean,
		): number => {
			if (position === digits.length)
				return started && product % sum === 0 ? 1 : 0;
			const key = `${position},${sum},${product},${started}`;
			if (!tight) {
				const cached = memo.get(key);
				if (cached !== undefined) return cached;
			}
			const limit = tight ? Number(digits[position]) : 9;
			let total = 0;
			for (let d = 0; d <= limit; d++) {
				const begins = started || d > 0;
				total += count(
					position + 1,
					sum + d,
					begins ? product * d : 1,
					begins,
					tight && d === limit,
				);
			}
			if (!tight) memo.set(key, total);
			return total;
		};
		return count(0, 0, 1, false, true);
	};
	return upTo(r) - upTo(l - 1);
};
