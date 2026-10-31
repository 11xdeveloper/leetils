const MOD = 1_000_000_007;

/**
 * 3352. Count K-Reducible Numbers Less Than N
 *
 * A number is k-reducible if replacing it with its count of set bits at
 * most `k` times reaches 1. Returns how many positive integers below n (the
 * binary string `s`) are k-reducible, modulo 10⁹ + 7.
 *
 * After one step a number below n becomes at most `s.length`, so work out
 * how many steps each small bit count needs. Then count the numbers below n
 * with each good bit count, digit by digit: whenever n has a 1, numbers
 * that match it so far and put 0 there are free to place the rest anyhow.
 *
 * @see https://leetcode.com/problems/count-k-reducible-numbers-less-than-n/
 * @difficulty Hard
 * @timeComplexity O(L²), for L bits
 * @spaceComplexity O(L²)
 *
 * @example
 * countKReducibleNumbersLessThanN("111", 1); // 3
 */
export const countKReducibleNumbersLessThanN = (
	s: string,
	k: number,
): number => {
	const L = s.length;
	const steps = new Int32Array(L + 1);
	for (let c = 2; c <= L; c++) {
		let bits = 0;
		for (let v = c; v; v &= v - 1) bits++;
		steps[c] = (steps[bits] ?? 0) + 1;
	}
	const choose = Array.from({ length: L + 1 }, () =>
		new Array<number>(L + 1).fill(0),
	);
	for (let n = 0; n <= L; n++) {
		const row = choose[n];
		if (!row) continue;
		row[0] = 1;
		for (let r = 1; r <= n; r++)
			row[r] =
				((choose[n - 1]?.[r - 1] ?? 0) + (choose[n - 1]?.[r] ?? 0)) % MOD;
	}
	let total = 0;
	let onesSoFar = 0;
	for (let i = 0; i < L; i++) {
		if (s[i] !== "1") continue;
		const free = L - i - 1;
		for (let c = Math.max(1, onesSoFar); c <= onesSoFar + free; c++)
			if ((steps[c] ?? 0) + 1 <= k)
				total = (total + (choose[free]?.[c - onesSoFar] ?? 0)) % MOD;
		onesSoFar++;
	}
	return total;
};
