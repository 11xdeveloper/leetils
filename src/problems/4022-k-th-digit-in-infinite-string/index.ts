/**
 * 4022. K-th Digit in Infinite String
 *
 * Write 1 to 9, then 19 down to 10, 20 up to 29, 39 down to 30, and so on
 * (blocks of ten, alternately increasing and decreasing), digits run
 * together. Returns the k-th digit.
 *
 * Every number in a block shares its digit count, so skip whole digit
 * lengths, then whole blocks, then numbers, reading the block forwards or
 * backwards by its parity.
 *
 * @see https://leetcode.com/problems/k-th-digit-in-infinite-string/
 * @difficulty Medium
 * @timeComplexity O(log k)
 * @spaceComplexity O(1)
 *
 * @example
 * kThDigitInInfiniteString(15); // 7
 */
export const kThDigitInInfiniteString = (k: number): number => {
	if (k <= 9) return k;
	k -= 9;
	// Blocks with d-digit numbers are b = 10^(d-2) … 10^(d-1) - 1.
	let digits = 2;
	let first = 1;
	for (;;) {
		const blocks = 9 * first;
		const length = blocks * 10 * digits;
		if (k <= length) break;
		k -= length;
		digits++;
		first *= 10;
	}
	const index = k - 1;
	const block = first + Math.floor(index / (10 * digits));
	const within = index % (10 * digits);
	const step = Math.floor(within / digits);
	const number = 10 * block + (block % 2 === 0 ? step : 9 - step);
	return Number(String(number)[within % digits]);
};
