/**
 * 3253. Construct String with Minimum Cost (Easy)
 *
 * Build `target` by appending words from `words`, where `words[i]` costs
 * `costs[i]` each time. Returns the smallest total cost, or -1.
 *
 * `best[i]` is the cheapest way to build the first i letters; from each
 * reachable position, try every word that matches there.
 *
 * @see https://leetcode.com/problems/construct-string-with-minimum-cost-easy/
 * @difficulty Medium
 * @timeComplexity O(n · L), for L letters of words
 * @spaceComplexity O(n)
 *
 * @example
 * constructStringWithMinimumCostEasy("abcdef", ["abdef", "abc", "d", "def", "ef"], [100, 1, 1, 10, 5]); // 7
 */
export const constructStringWithMinimumCostEasy = (
	target: string,
	words: readonly string[],
	costs: readonly number[],
): number => {
	const best = new Array<number>(target.length + 1).fill(
		Number.POSITIVE_INFINITY,
	);
	best[0] = 0;
	for (let i = 0; i < target.length; i++) {
		const here = best[i] ?? Number.POSITIVE_INFINITY;
		if (here === Number.POSITIVE_INFINITY) continue;
		words.forEach((word, w) => {
			const end = i + word.length;
			if (target.startsWith(word, i))
				best[end] = Math.min(best[end] ?? 0, here + (costs[w] ?? 0));
		});
	}
	const answer = best[target.length] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
