/**
 * 2284. Sender With Largest Word Count
 *
 * Returns the sender with the most words across their messages, the
 * lexicographically largest name on ties.
 *
 * Total the words per sender.
 *
 * @see https://leetcode.com/problems/sender-with-largest-word-count/
 * @difficulty Medium
 * @timeComplexity O(total length)
 * @spaceComplexity O(n)
 *
 * @example
 * senderWithLargestWordCount(["Hello userTwooo", "Hi userThree", "Wonderful day Alice", "Nice day userThree"], ["Alice", "userTwo", "userThree", "Alice"]); // "Alice"
 */
export const senderWithLargestWordCount = (
	messages: readonly string[],
	senders: readonly string[],
): string => {
	const words = new Map<string, number>();
	for (const [i, message] of messages.entries()) {
		const sender = senders[i] ?? "";
		words.set(sender, (words.get(sender) ?? 0) + message.split(" ").length);
	}
	let [best, bestCount] = ["", -1];
	for (const [sender, count] of words) {
		if (count > bestCount || (count === bestCount && sender > best))
			[best, bestCount] = [sender, count];
	}
	return best;
};
