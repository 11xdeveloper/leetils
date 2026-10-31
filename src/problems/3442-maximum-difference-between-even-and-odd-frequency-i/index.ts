/**
 * 3442. Maximum Difference Between Even and Odd Frequency I
 *
 * The largest frequency of a letter appearing an odd number of times minus
 * the smallest frequency of a letter appearing an even (non-zero) number of
 * times.
 *
 * Count the letters and pick the extremes.
 *
 * @see https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumDifferenceBetweenEvenAndOddFrequencyI("aaaaabbc"); // 3
 */
export const maximumDifferenceBetweenEvenAndOddFrequencyI = (
	s: string,
): number => {
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	const odd = Math.max(...counts.filter((c) => c % 2 === 1));
	const even = Math.min(...counts.filter((c) => c > 0 && c % 2 === 0));
	return odd - even;
};
