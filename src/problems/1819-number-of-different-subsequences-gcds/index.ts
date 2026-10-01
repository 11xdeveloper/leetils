/**
 * 1819. Number of Different Subsequences GCDs
 *
 * Counts the distinct GCDs of non-empty subsequences of `nums`.
 *
 * A value `g` is such a GCD exactly when the GCD of all present multiples
 * of `g` is `g` itself; checking every `g` up to the maximum touches a
 * harmonic number of multiples.
 *
 * @see https://leetcode.com/problems/number-of-different-subsequences-gcds/
 * @difficulty Hard
 * @timeComplexity O(M log M) for the largest value M
 * @spaceComplexity O(M)
 *
 * @example
 * numberOfDifferentSubsequencesGcds([6, 10, 3]); // 5
 */
export const numberOfDifferentSubsequencesGcds = (
	nums: readonly number[],
): number => {
	const largest = Math.max(...nums);
	const present = new Uint8Array(largest + 1);
	for (const num of nums) present[num] = 1;
	const gcd = (a: number, b: number) => {
		let [x, y] = [a, b];
		while (y > 0) [x, y] = [y, x % y];
		return x;
	};
	let count = 0;
	for (let g = 1; g <= largest; g++) {
		let common = 0;
		for (let multiple = g; multiple <= largest && common !== g; multiple += g) {
			if (present[multiple]) common = gcd(common, multiple);
		}
		if (common === g) count++;
	}
	return count;
};
