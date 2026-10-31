const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

const power = (base: number, exponent: number): number => {
	let result = 1;
	let b = base % MOD;
	for (let e = exponent; e > 0; e = Math.floor(e / 2)) {
		if (e % 2 === 1) result = multiply(result, b);
		b = multiply(b, b);
	}
	return result;
};

/**
 * 3343. Count Number of Balanced Permutations
 *
 * Count the distinct rearrangements of the digit string `num` whose digits
 * at even indices add up to the same as those at odd indices, modulo
 * 10⁹ + 7.
 *
 * Decide how many copies of each digit go to the even positions. For a
 * split with e_d copies of d at even positions, the arrangements number
 * evenSlots! · oddSlots! / Π e_d! (c_d - e_d)!. Dynamic programming over the
 * digits tracks the even-position sum and count, multiplying in the
 * inverse factorials as it goes.
 *
 * @see https://leetcode.com/problems/count-number-of-balanced-permutations/
 * @difficulty Hard
 * @timeComplexity O(10 · n² · S), for half-sum S
 * @spaceComplexity O(n · S)
 *
 * @example
 * countNumberOfBalancedPermutations("123"); // 2
 */
export const countNumberOfBalancedPermutations = (num: string): number => {
	const n = num.length;
	const counts = new Array<number>(10).fill(0);
	let total = 0;
	for (const char of num) {
		counts[Number(char)] = (counts[Number(char)] ?? 0) + 1;
		total += Number(char);
	}
	if (total % 2 === 1) return 0;
	const half = total / 2;
	const evenSlots = Math.ceil(n / 2);
	const factorial = [1];
	for (let i = 1; i <= n; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	const inverse = factorial.map((f) => power(f, MOD - 2));
	// ways[count * (half + 1) + sum]: weighted splits of the digits so far.
	let ways = new Array<number>((evenSlots + 1) * (half + 1)).fill(0);
	ways[0] = 1;
	counts.forEach((count, digit) => {
		const next = new Array<number>(ways.length).fill(0);
		for (let used = 0; used <= evenSlots; used++)
			for (let sum = 0; sum <= half; sum++) {
				const current = ways[used * (half + 1) + sum] ?? 0;
				if (current === 0) continue;
				for (
					let even = 0;
					even <= count &&
					used + even <= evenSlots &&
					sum + digit * even <= half;
					even++
				) {
					const weight = multiply(
						inverse[even] ?? 1,
						inverse[count - even] ?? 1,
					);
					const at = (used + even) * (half + 1) + sum + digit * even;
					next[at] = ((next[at] ?? 0) + multiply(current, weight)) % MOD;
				}
			}
		ways = next;
	});
	const splits = ways[evenSlots * (half + 1) + half] ?? 0;
	return multiply(
		multiply(splits, factorial[evenSlots] ?? 1),
		factorial[n - evenSlots] ?? 1,
	);
};
