/** C(n, k) mod p for a small prime p, by Lucas's theorem. */
const lucas = (n: number, k: number, p: number): number => {
	const small = (a: number, b: number): number => {
		if (b < 0 || b > a) return 0;
		let result = 1;
		for (let i = 0; i < b; i++) result = (result * (a - i)) / (i + 1);
		return result % p;
	};
	let result = 1;
	for (
		let a = n, b = k;
		a > 0 || b > 0;
		a = Math.floor(a / p), b = Math.floor(b / p)
	)
		result = (result * small(a % p, b % p)) % p;
	return result;
};

/**
 * 3463. Check If Digits Are Equal in String After Operations II
 *
 * Repeatedly replace the digit string with the sums mod 10 of neighbouring
 * digits until two digits remain. Returns whether they're equal, for
 * strings up to 10⁵ long.
 *
 * The last two digits are Σ C(n - 2, i) times digit i and digit i + 1, mod
 * 10. Compute the binomials mod 2 and mod 5 with Lucas's theorem and
 * combine them by the Chinese remainder theorem.
 *
 * @see https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfDigitsAreEqualInStringAfterOperationsII("3902"); // true
 */
export const checkIfDigitsAreEqualInStringAfterOperationsII = (
	s: string,
): boolean => {
	const n = s.length - 2;
	let first = 0;
	let second = 0;
	for (let i = 0; i <= n; i++) {
		const two = lucas(n, i, 2);
		const five = lucas(n, i, 5);
		// The x mod 10 with x ≡ two (mod 2) and x ≡ five (mod 5).
		const coefficient = five % 2 === two ? five : five + 5;
		first = (first + coefficient * Number(s[i])) % 10;
		second = (second + coefficient * Number(s[i + 1])) % 10;
	}
	return first === second;
};
