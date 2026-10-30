/**
 * 2800. Shortest String That Contains Three Strings
 *
 * Returns the shortest string containing `a`, `b` and `c` as substrings,
 * choosing the lexicographically smallest on ties.
 *
 * Try all six orders, merging each pair with the largest overlap (or not
 * at all if one already contains the other), and keep the best.
 *
 * @see https://leetcode.com/problems/shortest-string-that-contains-three-strings/
 * @difficulty Medium
 * @timeComplexity O(L²), where `L` is the total length
 * @spaceComplexity O(L)
 *
 * @example
 * shortestStringThatContainsThreeStrings("ab", "ba", "aba"); // "aba"
 */
export const shortestStringThatContainsThreeStrings = (
	a: string,
	b: string,
	c: string,
): string => {
	const merge = (x: string, y: string): string => {
		if (x.includes(y)) return x;
		for (let overlap = Math.min(x.length, y.length); overlap > 0; overlap--)
			if (x.endsWith(y.slice(0, overlap))) return x + y.slice(overlap);
		return x + y;
	};
	let best: string | undefined;
	for (const [x, y, z] of [
		[a, b, c],
		[a, c, b],
		[b, a, c],
		[b, c, a],
		[c, a, b],
		[c, b, a],
	] as const) {
		const candidate = merge(merge(x, y), z);
		if (
			best === undefined ||
			candidate.length < best.length ||
			(candidate.length === best.length && candidate < best)
		)
			best = candidate;
	}
	return best ?? "";
};
