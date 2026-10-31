/**
 * 3753. Total Waviness of Numbers in Range II
 *
 * A number's waviness counts its inner digits that are strictly greater
 * than both neighbours or strictly less than both. Returns the total
 * waviness of the numbers from `num1` to `num2` (up to 1e15).
 *
 * Digit DP for the total up to a bound, tracking the last two digits
 * placed: for each state, how many numbers continue from it and their
 * total waviness from here on. Answer the range as a difference.
 *
 * @see https://leetcode.com/problems/total-waviness-of-numbers-in-range-ii/
 * @difficulty Hard
 * @timeComplexity O(log n · 10³)
 * @spaceComplexity O(log n · 10²)
 *
 * @example
 * totalWavinessOfNumbersInRangeII(198, 202); // 3
 */
export const totalWavinessOfNumbersInRangeII = (
	num1: number,
	num2: number,
): number => {
	const upTo = (n: number): number => {
		if (n < 0) return 0;
		const digits = [...String(n)].map(Number);
		const length = digits.length;
		const memo = new Map<string, [count: number, waviness: number]>();
		// a, b: the last two digits placed (-1 before the number starts).
		const go = (
			pos: number,
			a: number,
			b: number,
			tight: boolean,
		): [number, number] => {
			if (pos === length) return [1, 0];
			const key = `${pos},${a},${b}`;
			const cached = tight ? undefined : memo.get(key);
			if (cached) return cached;
			let [count, waviness] = [0, 0];
			const top = tight ? (digits[pos] ?? 9) : 9;
			for (let d = 0; d <= top; d++) {
				const started = b >= 0 || d > 0;
				const [na, nb] = started ? [b, d] : [-1, -1];
				const [c, w] = go(pos + 1, na, nb, tight && d === top);
				const wave = a >= 0 && ((b > a && b > d) || (b < a && b < d)) ? 1 : 0;
				count += c;
				waviness += w + wave * c;
			}
			const result: [number, number] = [count, waviness];
			if (!tight) memo.set(key, result);
			return result;
		};
		return go(0, -1, -1, true)[1];
	};
	return upTo(num2) - upTo(num1 - 1);
};
