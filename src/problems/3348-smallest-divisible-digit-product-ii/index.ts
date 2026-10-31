const PRIMES = [2, 3, 5, 7] as const;
const DIGIT_EXPONENTS: readonly (readonly number[])[] = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[1, 0, 0, 0],
	[0, 1, 0, 0],
	[2, 0, 0, 0],
	[0, 0, 1, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 1],
	[3, 0, 0, 0],
	[0, 2, 0, 0],
];

/** The fewest digits whose product covers the exponents, smallest first. */
const fewestDigits = ([
	twos = 0,
	threes = 0,
	fives = 0,
	sevens = 0,
]: readonly number[]): number[] => {
	const digits: number[] = [];
	for (let i = 0; i < sevens; i++) digits.push(7);
	for (let i = 0; i < fives; i++) digits.push(5);
	for (let i = 0; i < Math.floor(threes / 2); i++) digits.push(9);
	for (let i = 0; i < Math.floor(twos / 3); i++) digits.push(8);
	const [two, three] = [twos % 3, threes % 2];
	if (three === 1 && two === 1) digits.push(6);
	else if (three === 1 && two === 2) digits.push(2, 6);
	else {
		if (three === 1) digits.push(3);
		if (two === 1) digits.push(2);
		if (two === 2) digits.push(4);
	}
	return digits.sort((a, b) => a - b);
};

/**
 * 3348. Smallest Divisible Digit Product II
 *
 * The smallest number at least `num` (a string of up to 2 · 10⁵ digits)
 * with no zero digit whose digits multiply to a multiple of `t`, or "-1".
 *
 * `t` must be built from 2, 3, 5 and 7, and its need for each prime is what
 * matters. If `num` works, it's the answer. Otherwise keep the longest
 * zero-free prefix possible, raise the next digit by as little as
 * possible, and fill the rest with 1s followed by the fewest digits that
 * cover what's still needed; failing everything, use a longer number.
 *
 * @see https://leetcode.com/problems/smallest-divisible-digit-product-ii/
 * @difficulty Hard
 * @timeComplexity O(n + log t)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestDivisibleDigitProductII("1234", 256); // "1488"
 */
export const smallestDivisibleDigitProductII = (
	num: string,
	t: number,
): string => {
	const need = [0, 0, 0, 0];
	let rest = t;
	PRIMES.forEach((p, i) => {
		while (rest % p === 0) {
			rest /= p;
			need[i] = (need[i] ?? 0) + 1;
		}
	});
	if (rest !== 1) return "-1";
	const n = num.length;
	const digitsOf = (i: number): number => Number(num[i]);
	const firstZero = num.indexOf("0");
	const prefixEnd = firstZero === -1 ? n : firstZero;
	// have[i]: exponents covered by num[0..i), for i up to the first zero.
	const have: number[][] = [[0, 0, 0, 0]];
	for (let i = 0; i < prefixEnd; i++) {
		const add = DIGIT_EXPONENTS[digitsOf(i)] ?? [];
		have.push((have[i] ?? []).map((e, p) => e + (add[p] ?? 0)));
	}
	const left = (covered: readonly number[]): number[] =>
		need.map((e, p) => Math.max(0, e - (covered[p] ?? 0)));
	if (firstZero === -1 && left(have[n] ?? []).every((e) => e === 0)) return num;
	for (let i = Math.min(prefixEnd, n - 1); i >= 0; i--) {
		const covered = have[i] ?? [];
		for (let d = digitsOf(i) + 1; d <= 9; d++) {
			const add = DIGIT_EXPONENTS[d] ?? [];
			const fill = fewestDigits(left(covered.map((e, p) => e + (add[p] ?? 0))));
			const room = n - i - 1;
			if (fill.length <= room)
				return (
					num.slice(0, i) + d + "1".repeat(room - fill.length) + fill.join("")
				);
		}
	}
	const fill = fewestDigits(need);
	const length = Math.max(n + 1, fill.length);
	return "1".repeat(length - fill.length) + fill.join("");
};
