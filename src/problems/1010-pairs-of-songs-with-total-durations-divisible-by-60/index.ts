/**
 * 1010. Pairs of Songs With Total Durations Divisible by 60
 *
 * Counts the pairs of songs `i < j` whose durations add to a multiple of 60.
 *
 * Counts the remainders mod 60 seen so far; each song pairs with every
 * earlier song whose remainder complements its own.
 *
 * @see https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(60)
 *
 * @example
 * pairsOfSongsWithTotalDurationsDivisibleBy60([30, 20, 150, 100, 40]); // 3
 */
export const pairsOfSongsWithTotalDurationsDivisibleBy60 = (
	time: readonly number[],
): number => {
	const counts = new Array<number>(60).fill(0);
	let pairs = 0;
	for (const duration of time) {
		const remainder = duration % 60;
		pairs += counts[(60 - remainder) % 60] ?? 0;
		counts[remainder] = (counts[remainder] ?? 0) + 1;
	}
	return pairs;
};
