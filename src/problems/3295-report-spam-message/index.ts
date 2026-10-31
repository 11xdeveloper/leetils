/**
 * 3295. Report Spam Message
 *
 * A message is spam if at least two of its words (counting repeats) are
 * banned.
 *
 * Put the banned words in a set and count matches.
 *
 * @see https://leetcode.com/problems/report-spam-message/
 * @difficulty Medium
 * @timeComplexity O(n + b)
 * @spaceComplexity O(b)
 *
 * @example
 * reportSpamMessage(["hello", "world", "leetcode"], ["world", "hello"]); // true
 */
export const reportSpamMessage = (
	message: readonly string[],
	bannedWords: readonly string[],
): boolean => {
	const banned = new Set(bannedWords);
	let count = 0;
	for (const word of message)
		if (banned.has(word) && ++count === 2) return true;
	return false;
};
