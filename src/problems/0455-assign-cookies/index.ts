/**
 * 455. Assign Cookies
 *
 * Child `i` is content with a cookie of size at least `g[i]`, and each child
 * gets at most one cookie. Returns the most children that can be made
 * content with the cookies of sizes `s`.
 *
 * Greedy after sorting both: the least greedy child left takes the smallest
 * cookie that satisfies them, so bigger cookies stay for greedier children.
 *
 * @see https://leetcode.com/problems/assign-cookies/
 * @difficulty Easy
 * @timeComplexity O(n log n + m log m)
 * @spaceComplexity O(n + m) for the sorted copies
 *
 * @example
 * assignCookies([1, 2], [1, 2, 3]); // 2
 */
export const assignCookies = (
	g: readonly number[],
	s: readonly number[],
): number => {
	const greed = g.toSorted((a, b) => a - b);
	const sizes = s.toSorted((a, b) => a - b);

	let content = 0;
	for (const size of sizes) {
		if (content < greed.length && size >= (greed[content] ?? 0)) content++;
	}
	return content;
};
