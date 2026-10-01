/**
 * 484. Find Permutation
 *
 * `s` describes a permutation of 1 to `n` (where `n` is `s.length + 1`):
 * `s[i]` is `"I"` if the next number is larger and `"D"` if it's smaller.
 * Returns the lexicographically smallest permutation it describes.
 *
 * Starts from 1, 2, …, n, which fits all the `"I"`s, and reverses the
 * numbers under each run of `"D"`s, including the number after the run.
 * That's the smallest way to make each run decrease, and keeps the order
 * between runs increasing.
 *
 * @see https://leetcode.com/problems/find-permutation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * findPermutation("DI"); // [2, 1, 3]
 */
export const findPermutation = (s: string): number[] => {
	const permutation = Array.from({ length: s.length + 1 }, (_, i) => i + 1);

	for (let i = 0; i < s.length; ) {
		if (s.charAt(i) !== "D") {
			i++;
			continue;
		}
		let end = i;
		while (end < s.length && s.charAt(end) === "D") end++;
		permutation.splice(
			i,
			end - i + 1,
			...permutation.slice(i, end + 1).reverse(),
		);
		i = end;
	}

	return permutation;
};
