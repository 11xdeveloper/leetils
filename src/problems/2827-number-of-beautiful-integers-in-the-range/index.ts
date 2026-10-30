/**
 * 2827. Number of Beautiful Integers in the Range
 *
 * An integer is beautiful if it has as many even digits as odd ones and
 * is divisible by `k`. Returns how many beautiful integers lie in
 * `[low, high]`.
 *
 * Digit DP over position, even-minus-odd balance and remainder modulo
 * `k`, counting up to a bound; leading zeros aren't counted as digits.
 *
 * @see https://leetcode.com/problems/number-of-beautiful-integers-in-the-range/
 * @difficulty Hard
 * @timeComplexity O(d² · k · 10), where `d` is the number of digits
 * @spaceComplexity O(d · k)
 *
 * @example
 * numberOfBeautifulIntegersInTheRange(10, 20, 3); // 2
 */
export const numberOfBeautifulIntegersInTheRange = (
	low: number,
	high: number,
	k: number,
): number => {
	/** Beautiful integers from 1 to `bound`. */
	const upTo = (bound: number): number => {
		const digits = [...String(bound)].map(Number);
		const d = digits.length;
		const offset = d;
		// free[balance][remainder]: started numbers already below the bound's prefix.
		let free = Array.from({ length: 2 * d + 1 }, () =>
			Array.from({ length: k }, () => 0),
		);
		let tightBalance = 0;
		let tightRemainder = 0;
		for (const [i, digit] of digits.entries()) {
			const next = Array.from({ length: 2 * d + 1 }, () =>
				Array.from({ length: k }, () => 0),
			);
			const add = (balance: number, remainder: number, ways: number): void => {
				const row = next[balance + offset];
				if (row) row[remainder] = (row[remainder] ?? 0) + ways;
			};
			for (let b = -d; b <= d; b++)
				for (let r = 0; r < k; r++) {
					const ways = free[b + offset]?.[r] ?? 0;
					if (ways === 0) continue;
					for (let x = 0; x <= 9; x++)
						add(b + (x % 2 === 0 ? 1 : -1), (r * 10 + x) % k, ways);
				}
			if (i > 0)
				for (let x = 1; x <= 9; x++) add(x % 2 === 0 ? 1 : -1, x % k, 1);
			for (let x = i === 0 ? 1 : 0; x < digit; x++)
				add(
					tightBalance + (x % 2 === 0 ? 1 : -1),
					(tightRemainder * 10 + x) % k,
					1,
				);
			tightBalance += digit % 2 === 0 ? 1 : -1;
			tightRemainder = (tightRemainder * 10 + digit) % k;
			free = next;
		}
		return (
			(free[offset]?.[0] ?? 0) +
			(tightBalance === 0 && tightRemainder === 0 ? 1 : 0)
		);
	};
	return upTo(high) - (low > 1 ? upTo(low - 1) : 0);
};
