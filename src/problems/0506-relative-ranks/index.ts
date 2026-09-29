/**
 * 506. Relative Ranks
 *
 * Given distinct scores, returns each athlete's rank: `"Gold Medal"`,
 * `"Silver Medal"` and `"Bronze Medal"` for the top three, and the placing
 * as a number (like `"4"`) for everyone else.
 *
 * Sorts the athletes' indices by score, highest first, and labels them in
 * that order.
 *
 * @see https://leetcode.com/problems/relative-ranks/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * relativeRanks([10, 3, 8, 9, 4]); // ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"]
 */
export const relativeRanks = (score: readonly number[]): string[] => {
	const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
	const ranks = new Array<string>(score.length);
	const order = score
		.map((_, i) => i)
		.sort((a, b) => (score[b] ?? 0) - (score[a] ?? 0));
	for (const [place, athlete] of order.entries())
		ranks[athlete] = medals[place] ?? String(place + 1);
	return ranks;
};
