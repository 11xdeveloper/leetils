/**
 * 2223. Sum of Scores of Built Strings
 *
 * Each suffix of `s` scores the length of its longest common prefix with
 * `s`. Returns the total score.
 *
 * Those lengths are exactly the Z-function of `s` (plus `n` for `s`
 * itself).
 *
 * @see https://leetcode.com/problems/sum-of-scores-of-built-strings/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfScoresOfBuiltStrings("babab"); // 9
 */
export const sumOfScoresOfBuiltStrings = (s: string): number => {
	const n = s.length;
	const z = new Int32Array(n);
	let total = n;
	for (let i = 1, left = 0, right = 0; i < n; i++) {
		let length = i < right ? Math.min(right - i, z[i - left] ?? 0) : 0;
		while (i + length < n && s[length] === s[i + length]) length++;
		z[i] = length;
		if (i + length > right) [left, right] = [i, i + length];
		total += length;
	}
	return total;
};
