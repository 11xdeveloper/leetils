/**
 * 833. Find And Replace in String
 *
 * Applies the replacement operations `(indices[i], sources[i], targets[i])`
 * to `s` all at once: where `sources[i]` occurs at `indices[i]` in the
 * original string, it's replaced by `targets[i]`. The replaced parts don't
 * overlap.
 *
 * Records which operation, if any, matches at each index of the original,
 * then rebuilds the string left to right.
 *
 * @see https://leetcode.com/problems/find-and-replace-in-string/
 * @difficulty Medium
 * @timeComplexity O(n + total length of the operations)
 * @spaceComplexity O(n)
 *
 * @example
 * findAndReplaceInString("abcd", [0, 2], ["a", "cd"], ["eee", "ffff"]); // "eeebffff"
 */
export const findAndReplaceInString = (
	s: string,
	indices: readonly number[],
	sources: readonly string[],
	targets: readonly string[],
): string => {
	const operationAt = new Map<number, number>();
	for (const [i, index] of indices.entries()) {
		if (s.startsWith(sources[i] ?? "", index)) operationAt.set(index, i);
	}

	let result = "";
	for (let i = 0; i < s.length; ) {
		const operation = operationAt.get(i);
		if (operation === undefined) {
			result += s.charAt(i++);
		} else {
			result += targets[operation] ?? "";
			i += (sources[operation] ?? "").length;
		}
	}
	return result;
};
