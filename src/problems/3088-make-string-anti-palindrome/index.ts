/**
 * 3088. Make String Anti-palindrome
 *
 * The lexicographically smallest rearrangement of the even-length `s` in
 * which every letter differs from its mirror (`t[i] ≠ t[n - 1 - i]`), or
 * `"-1"` if there's none.
 *
 * Impossible if any letter fills more than half the string. Otherwise the
 * sorted first half is best and never conflicts, except with copies of its
 * last letter. Those mirror the start of the second half, so fill those
 * positions with the smallest other letters, then the rest in sorted order.
 *
 * @see https://leetcode.com/problems/make-string-anti-palindrome/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeStringAntiPalindrome("abca"); // "aabc"
 */
export const makeStringAntiPalindrome = (s: string): string => {
	const n = s.length;
	const half = n / 2;
	const sorted = [...s].sort();
	const counts = new Map<string, number>();
	for (const char of sorted) counts.set(char, (counts.get(char) ?? 0) + 1);
	if ([...counts.values()].some((count) => count > half)) return "-1";
	const result = sorted.slice(0, half);
	const rest = sorted.slice(half);
	const last = result[half - 1] ?? "";
	let clashes = 0;
	while (clashes < half && result[half - 1 - clashes] === last) clashes++;
	const others = rest.filter((char) => char !== last);
	const same = rest.filter((char) => char === last);
	const tail = [...others.slice(0, clashes)];
	for (const char of [...same, ...others.slice(clashes)].sort())
		tail.push(char);
	return [...result, ...tail].join("");
};
