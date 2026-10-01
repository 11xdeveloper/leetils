/**
 * 948. Bag of Tokens
 *
 * Starting with `power` and a score of 0, each token can be played once:
 * face up (spend its value in power, gain 1 score) or face down (spend 1
 * score, gain its value in power). Returns the highest score reachable.
 *
 * Greedy with the tokens sorted: play the cheapest face up while affordable;
 * otherwise, if it helps, trade a point for the most expensive token. The
 * best score seen along the way is the answer.
 *
 * @see https://leetcode.com/problems/bag-of-tokens/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * bagOfTokens([100, 200, 300, 400], 200); // 2
 */
export const bagOfTokens = (
	tokens: readonly number[],
	power: number,
): number => {
	const sorted = tokens.toSorted((a, b) => a - b);
	let score = 0;
	let best = 0;
	for (let low = 0, high = sorted.length - 1; low <= high; ) {
		if (power >= (sorted[low] ?? 0)) {
			power -= sorted[low++] ?? 0;
			best = Math.max(best, ++score);
		} else if (score > 0 && low < high) {
			power += sorted[high--] ?? 0;
			score--;
		} else {
			break;
		}
	}
	return best;
};
