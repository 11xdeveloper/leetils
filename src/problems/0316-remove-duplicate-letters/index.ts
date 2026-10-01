/**
 * 316. Remove Duplicate Letters
 *
 * Removes repeated letters from `s` so each letter appears once, choosing
 * which copies to keep so the result is the smallest in lexicographic order.
 *
 * Builds the result on a stack. A new letter pops any larger letters before
 * it that appear again later, since keeping a later copy of those gives a
 * smaller result. Letters already on the stack are skipped.
 *
 * @see https://leetcode.com/problems/remove-duplicate-letters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), at most 26 letters
 *
 * @example
 * removeDuplicateLetters("cbacdcbc"); // "acdb"
 */
export const removeDuplicateLetters = (s: string): string => {
	const lastIndex = new Map([...s].map((char, i) => [char, i]));
	const stack: string[] = [];
	const inStack = new Set<string>();

	for (const [i, char] of [...s].entries()) {
		if (inStack.has(char)) continue;
		while (
			stack.length > 0 &&
			(stack.at(-1) ?? "") > char &&
			(lastIndex.get(stack.at(-1) ?? "") ?? -1) > i
		) {
			inStack.delete(stack.pop() ?? "");
		}
		stack.push(char);
		inStack.add(char);
	}

	return stack.join("");
};
