/**
 * 3713. Longest Balanced Substring I
 *
 * A substring is balanced if all its distinct letters appear equally
 * often. Returns the length of the longest balanced substring.
 *
 * From each start, extend while tracking the letter counts, the number of
 * distinct letters and the largest count: balanced when that count times
 * the distinct letters is the length.
 *
 * @see https://leetcode.com/problems/longest-balanced-substring-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * longestBalancedSubstringI("abbac"); // 4
 */
export const longestBalancedSubstringI = (s: string): number => {
	let best = 0;
	const counts = new Int32Array(26);
	for (let i = 0; i < s.length; i++) {
		counts.fill(0);
		let [distinct, most] = [0, 0];
		for (let j = i; j < s.length; j++) {
			const c = s.charCodeAt(j) - 97;
			const count = (counts[c] ?? 0) + 1;
			counts[c] = count;
			if (count === 1) distinct++;
			most = Math.max(most, count);
			if (most * distinct === j - i + 1) best = Math.max(best, j - i + 1);
		}
	}
	return best;
};
