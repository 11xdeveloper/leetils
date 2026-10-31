const MOD = 1_000_000_007;

/**
 * 3757. Number of Effective Subsequences
 *
 * A subsequence is effective if deleting it from `nums` leaves a strictly
 * smaller bitwise OR. Counts the effective subsequences, modulo 1e9+7.
 *
 * Deleting lowers the OR exactly when it removes every element holding
 * some bit of the total. Inclusion-exclusion over sets B of those bits:
 * the subsequences containing every holder of B number 2 to the power of
 * the elements avoiding B, which a sum over subsets counts for every B.
 *
 * @see https://leetcode.com/problems/number-of-effective-subsequences/
 * @difficulty Hard
 * @timeComplexity O(n + 2^b · b), for the b bits of the total
 * @spaceComplexity O(n + 2^b)
 *
 * @example
 * numberOfEffectiveSubsequences([2, 2, 1]); // 5
 */
export const numberOfEffectiveSubsequences = (
	nums: readonly number[],
): number => {
	const total = nums.reduce((a, b) => a | b, 0);
	const bits: number[] = [];
	for (let bit = 0; bit < 31; bit++) if ((total >> bit) & 1) bits.push(bit);
	const b = bits.length;
	const full = (1 << b) - 1;
	// within[mask]: elements using only the bits in mask.
	const within = new Int32Array(1 << b);
	for (const num of nums) {
		let mask = 0;
		bits.forEach((bit, i) => {
			if ((num >> bit) & 1) mask |= 1 << i;
		});
		within[mask] = (within[mask] ?? 0) + 1;
	}
	for (let i = 0; i < b; i++)
		for (let mask = 0; mask <= full; mask++)
			if ((mask >> i) & 1)
				within[mask] = (within[mask] ?? 0) + (within[mask ^ (1 << i)] ?? 0);
	const powers = [1];
	for (let i = 0; i < nums.length; i++)
		powers.push(((powers[i] ?? 1) * 2) % MOD);
	let count = 0;
	for (let chosen = 1; chosen <= full; chosen++) {
		let size = 0;
		for (let m = chosen; m; m &= m - 1) size++;
		const ways = powers[within[full ^ chosen] ?? 0] ?? 0;
		count = (count + (size % 2 === 1 ? ways : MOD - ways)) % MOD;
	}
	return count;
};
