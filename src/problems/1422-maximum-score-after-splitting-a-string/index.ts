/**
 * 1422. Maximum Score After Splitting a String
 *
 * Splits the binary string `s` into two non-empty parts and scores the 0s
 * on the left plus the 1s on the right. Returns the best score.
 *
 * Moves the split point along, updating both counts as each character
 * crosses from right to left.
 *
 * @see https://leetcode.com/problems/maximum-score-after-splitting-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumScoreAfterSplittingAString("011101"); // 5
 */
export const maximumScoreAfterSplittingAString = (s: string): number => {
	let [zerosLeft, onesRight] = [
		0,
		[...s].filter((char) => char === "1").length,
	];
	let best = 0;
	for (let i = 0; i < s.length - 1; i++) {
		if (s[i] === "0") zerosLeft++;
		else onesRight--;
		best = Math.max(best, zerosLeft + onesRight);
	}
	return best;
};
