/**
 * 3966. Count Good Integers in a Range
 *
 * Counts the integers from `l` to `r` whose neighbouring digits all
 * differ by at most `k`.
 *
 * Digit DP for the count up to a bound, tracking the previous digit.
 *
 * @see https://leetcode.com/problems/count-good-integers-in-a-range/
 * @difficulty Hard
 * @timeComplexity O(log r · 10²)
 * @spaceComplexity O(log r · 10)
 *
 * @example
 * countGoodIntegersInARange(10, 15, 1); // 3
 */
export const countGoodIntegersInARange = (
	l: number,
	r: number,
	k: number,
): number => {
	const upTo = (n: number): number => {
		if (n < 0) return 0;
		const digits = [...String(n)].map(Number);
		const memo = new Map<string, number>();
		// previous: the last digit placed, or -1 before the number starts.
		const go = (pos: number, previous: number, tight: boolean): number => {
			if (pos === digits.length) return previous >= 0 ? 1 : 0;
			const key = `${pos},${previous}`;
			const cached = tight ? undefined : memo.get(key);
			if (cached !== undefined) return cached;
			const top = tight ? (digits[pos] ?? 9) : 9;
			let count = 0;
			for (let d = 0; d <= top; d++) {
				if (previous < 0 && d === 0)
					count += go(pos + 1, -1, tight && d === top);
				else if (previous < 0 || Math.abs(d - previous) <= k)
					count += go(pos + 1, d, tight && d === top);
			}
			if (!tight) memo.set(key, count);
			return count;
		};
		return go(0, -1, true);
	};
	return upTo(r) - upTo(l - 1);
};
