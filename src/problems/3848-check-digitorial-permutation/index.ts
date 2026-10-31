const FACTORIALS = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];

/**
 * 3848. Check Digitorial Permutation
 *
 * A number is digitorial if it equals the sum of its digits' factorials.
 * Whether some rearrangement of `n`'s digits (without a leading zero) is
 * digitorial.
 *
 * The factorial sum only depends on which digits there are, so compute it
 * once and check that it uses the same digits.
 *
 * @see https://leetcode.com/problems/check-digitorial-permutation/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * checkDigitorialPermutation(145); // true
 */
export const checkDigitorialPermutation = (n: number): boolean => {
	const digits = String(n);
	const sum = [...digits].reduce(
		(total, d) => total + (FACTORIALS[Number(d)] ?? 0),
		0,
	);
	const sorted = (x: string) => [...x].sort().join("");
	return sorted(String(sum)) === sorted(digits);
};
