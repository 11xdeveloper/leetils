/**
 * 2781. Length of the Longest Valid Substring
 *
 * A substring is valid if it contains none of the `forbidden` strings,
 * each at most 10 characters long. Returns the longest valid length.
 *
 * Sweep start positions from the right, tracking the furthest a valid
 * substring can reach: for each start, a forbidden string beginning
 * there caps the end before its last character.
 *
 * @see https://leetcode.com/problems/length-of-the-longest-valid-substring/
 * @difficulty Hard
 * @timeComplexity O(n · 10²)
 * @spaceComplexity O(total forbidden length)
 *
 * @example
 * lengthOfTheLongestValidSubstring("cbaaaabc", ["aaa", "cb"]); // 4
 */
export const lengthOfTheLongestValidSubstring = (
	word: string,
	forbidden: readonly string[],
): number => {
	const banned = new Set(forbidden);
	let end = word.length;
	let best = 0;
	for (let start = word.length - 1; start >= 0; start--) {
		for (let length = 1; length <= 10 && start + length <= end; length++)
			if (banned.has(word.slice(start, start + length))) {
				end = start + length - 1;
				break;
			}
		best = Math.max(best, end - start);
	}
	return best;
};
