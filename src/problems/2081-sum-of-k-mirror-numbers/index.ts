/**
 * 2081. Sum of k-Mirror Numbers
 *
 * A k-mirror number is a positive integer that reads the same forwards
 * and backwards in base 10 and in base `k`. Returns the sum of the `n`
 * smallest.
 *
 * Generate base-10 palindromes in increasing order, by length and then by
 * their first half, and keep those that are palindromes in base `k`.
 *
 * @see https://leetcode.com/problems/sum-of-k-mirror-numbers/
 * @difficulty Hard
 * @timeComplexity O(√M · log M) for the n-th k-mirror number M
 * @spaceComplexity O(log M)
 *
 * @example
 * sumOfKMirrorNumbers(2, 5); // 25
 */
export const sumOfKMirrorNumbers = (k: number, n: number): number => {
	const isPalindrome = (s: string): boolean => {
		for (let [i, j] = [0, s.length - 1]; i < j; i++, j--)
			if (s[i] !== s[j]) return false;
		return true;
	};
	let [sum, found] = [0, 0];
	for (let length = 1; ; length++) {
		const halfLength = Math.ceil(length / 2);
		for (let half = 10 ** (halfLength - 1); half < 10 ** halfLength; half++) {
			const first = String(half);
			const second = [...first.slice(0, length - halfLength)]
				.reverse()
				.join("");
			const number = Number(first + second);
			if (!isPalindrome(number.toString(k))) continue;
			sum += number;
			if (++found === n) return sum;
		}
	}
};
