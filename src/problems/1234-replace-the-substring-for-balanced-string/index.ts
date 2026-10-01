/**
 * 1234. Replace the Substring for Balanced String
 *
 * `s` is made of `Q`, `W`, `E` and `R`, and its length `n` is a multiple of
 * 4. Returns the length of the shortest substring that could be replaced to
 * make each letter appear exactly `n / 4` times.
 *
 * A window can be replaced to fix things exactly when no letter outside it
 * appears more than `n / 4` times. Slide a window, shrinking it from the
 * left while that still holds, and keep the shortest.
 *
 * @see https://leetcode.com/problems/replace-the-substring-for-balanced-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * replaceTheSubstringForBalancedString("QQQW"); // 2
 */
export const replaceTheSubstringForBalancedString = (s: string): number => {
	const quota = s.length / 4;
	const outside = new Map<string, number>();
	for (const char of s) outside.set(char, (outside.get(char) ?? 0) + 1);
	const fits = () => [...outside.values()].every((count) => count <= quota);
	if (fits()) return 0;
	let shortest = s.length;
	let start = 0;
	for (let end = 0; end < s.length; end++) {
		const char = s[end] ?? "";
		outside.set(char, (outside.get(char) ?? 0) - 1);
		while (start <= end && fits()) {
			shortest = Math.min(shortest, end - start + 1);
			const leaving = s[start] ?? "";
			outside.set(leaving, (outside.get(leaving) ?? 0) + 1);
			start++;
		}
	}
	return shortest;
};
