/**
 * 2014. Longest Subsequence Repeated k Times
 *
 * Returns the longest string whose `k`-fold repetition is a subsequence of
 * `s` (with `n < 8k`), the lexicographically largest on ties.
 *
 * Only letters appearing `k` times can be used, and the answer is under 8
 * letters. Grow candidates breadth-first, appending letters in order and
 * keeping those still repeated `k` times; the last kept is the answer.
 *
 * @see https://leetcode.com/problems/longest-subsequence-repeated-k-times/
 * @difficulty Hard
 * @timeComplexity O(n · 7!) at worst
 * @spaceComplexity O(7!)
 *
 * @example
 * longestSubsequenceRepeatedKTimes("letsleetcode", 2); // "let"
 */
export const longestSubsequenceRepeatedKTimes = (
	s: string,
	k: number,
): string => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	const letters = [...counts]
		.filter(([, count]) => count >= k)
		.map(([char]) => char)
		.sort();

	const repeatedKTimes = (candidate: string): boolean => {
		let [matched, rounds] = [0, 0];
		for (const char of s) {
			if (char !== candidate[matched]) continue;
			matched++;
			if (matched === candidate.length) {
				[matched, rounds] = [0, rounds + 1];
				if (rounds === k) return true;
			}
		}
		return false;
	};

	let longest = "";
	const queue = [""];
	for (let head = 0; head < queue.length; head++) {
		const prefix = queue[head] ?? "";
		for (const letter of letters) {
			const candidate = prefix + letter;
			if (!repeatedKTimes(candidate)) continue;
			longest = candidate;
			queue.push(candidate);
		}
	}
	return longest;
};
