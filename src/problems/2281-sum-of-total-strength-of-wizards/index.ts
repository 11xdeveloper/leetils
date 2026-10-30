/**
 * 2281. Sum of Total Strength of Wizards
 *
 * A group of contiguous wizards has strength (weakest) × (sum). Returns
 * the total strength of all groups, modulo 10^9 + 7.
 *
 * For each wizard as the weakest (ties go to the rightmost), monotonic
 * stacks bound the groups. The sum of their sums comes from prefix sums of
 * prefix sums. Arithmetic is in BigInt to stay exact.
 *
 * @see https://leetcode.com/problems/sum-of-total-strength-of-wizards/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfTotalStrengthOfWizards([1, 3, 1, 2]); // 44
 */
export const sumOfTotalStrengthOfWizards = (
	strength: readonly number[],
): number => {
	const MOD = 1_000_000_007n;
	const n = strength.length;
	// prefix[i] = sum of strength[0..i); twice[i] = sum of prefix[0..i).
	const prefix = [0n];
	for (const s of strength)
		prefix.push(((prefix.at(-1) ?? 0n) + BigInt(s)) % MOD);
	const twice = [0n];
	for (const p of prefix) twice.push(((twice.at(-1) ?? 0n) + p) % MOD);

	const left = new Array<number>(n).fill(-1);
	const right = new Array<number>(n).fill(n);
	const stack: number[] = [];
	for (const [i, s] of strength.entries()) {
		while (stack.length && (strength[stack.at(-1) ?? 0] ?? 0) >= s)
			right[stack.pop() ?? 0] = i;
		left[i] = stack.at(-1) ?? -1;
		stack.push(i);
	}

	let total = 0n;
	for (const [i, s] of strength.entries()) {
		const [l, r] = [left[i] ?? -1, right[i] ?? n];
		// Groups [a, b] with l < a ≤ i ≤ b < r sum to prefix[b + 1] - prefix[a].
		const ends = (twice[r + 1] ?? 0n) - (twice[i + 1] ?? 0n);
		const starts = (twice[i + 1] ?? 0n) - (twice[l + 1] ?? 0n);
		const sums = BigInt(i - l) * ends - BigInt(r - i) * starts;
		total = (total + BigInt(s) * (((sums % MOD) + MOD) % MOD)) % MOD;
	}
	return Number(total);
};
