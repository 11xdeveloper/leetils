/**
 * 2696. Minimum String Length After Removing Substrings
 *
 * Repeatedly removes any "AB" or "CD" from `s`. Returns the shortest
 * length reachable.
 *
 * A stack cancels each `B` or `D` against the letter just before it, as
 * removals can expose new pairs.
 *
 * @see https://leetcode.com/problems/minimum-string-length-after-removing-substrings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumStringLengthAfterRemovingSubstrings("ABFCACDB"); // 2
 */
export const minimumStringLengthAfterRemovingSubstrings = (
	s: string,
): number => {
	const stack: string[] = [];
	for (const c of s) {
		const top = stack.at(-1);
		if ((c === "B" && top === "A") || (c === "D" && top === "C")) stack.pop();
		else stack.push(c);
	}
	return stack.length;
};
