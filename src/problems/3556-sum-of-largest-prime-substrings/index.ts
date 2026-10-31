const isPrime = (num: number): boolean => {
	if (num < 2) return false;
	for (let d = 2; d * d <= num; d++) if (num % d === 0) return false;
	return true;
};

/**
 * 3556. Sum of Largest Prime Substrings
 *
 * Add up the three largest distinct primes formed by substrings of the
 * digit string `s` (fewer if there aren't three).
 *
 * The string is at most 10 digits, so test every substring by trial
 * division.
 *
 * @see https://leetcode.com/problems/sum-of-largest-prime-substrings/
 * @difficulty Medium
 * @timeComplexity O(n² · √V), for values up to V
 * @spaceComplexity O(n²)
 *
 * @example
 * sumOfLargestPrimeSubstrings("12234"); // 1469
 */
export const sumOfLargestPrimeSubstrings = (s: string): number => {
	const primes = new Set<number>();
	for (let i = 0; i < s.length; i++)
		for (let j = i + 1; j <= s.length; j++) {
			const value = Number(s.slice(i, j));
			if (isPrime(value)) primes.add(value);
		}
	return [...primes]
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, b) => a + b, 0);
};
