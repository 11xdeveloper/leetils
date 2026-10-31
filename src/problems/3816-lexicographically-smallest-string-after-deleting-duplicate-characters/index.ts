/**
 * 3816. Lexicographically Smallest String After Deleting Duplicate Characters
 *
 * Repeatedly delete one occurrence of a letter that appears at least
 * twice. Returns the smallest string reachable.
 *
 * Build the result on a stack: before pushing a letter, pop larger
 * letters that still have another copy somewhere. At the end, drop
 * trailing letters that have another copy, since a prefix is smaller.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-deleting-duplicate-characters/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterDeletingDuplicateCharacters("aaccb"); // "aacb"
 */
export const lexicographicallySmallestStringAfterDeletingDuplicateCharacters = (
	s: string,
): string => {
	const left = new Map<string, number>();
	for (const c of s) left.set(c, (left.get(c) ?? 0) + 1);
	const stack: string[] = [];
	const droppable = () => {
		const top = stack.at(-1);
		return top !== undefined && (left.get(top) ?? 0) > 1;
	};
	const drop = () => {
		const top = stack.pop() ?? "";
		left.set(top, (left.get(top) ?? 0) - 1);
	};
	for (const c of s) {
		while ((stack.at(-1) ?? "") > c && droppable()) drop();
		stack.push(c);
	}
	while (droppable()) drop();
	return stack.join("");
};
