/**
 * 60. Permutation Sequence
 *
 * Returns the `k`th permutation, counting from 1, of the digits 1 to `n` in
 * lexicographic order.
 *
 * There are (n - 1)! permutations starting with each digit, so dividing
 * `k - 1` by (n - 1)! picks the first digit, and the remainder picks the rest
 * the same way from the digits left.
 *
 * @see https://leetcode.com/problems/permutation-sequence/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * permutationSequence(3, 3); // "213"
 */
export const permutationSequence = (n: number, k: number): string => {
	const digits = Array.from({ length: n }, (_, i) => i + 1);
	const factorials = [1];
	for (let i = 1; i < n; i++) factorials.push((factorials[i - 1] ?? 1) * i);

	let rest = k - 1;
	let permutation = "";
	for (let i = n - 1; i >= 0; i--) {
		const factorial = factorials[i] ?? 1;
		const index = Math.floor(rest / factorial);
		rest %= factorial;
		permutation += digits.splice(index, 1)[0];
	}

	return permutation;
};
