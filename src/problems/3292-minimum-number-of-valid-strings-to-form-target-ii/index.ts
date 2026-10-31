/**
 * 3292. Minimum Number of Valid Strings to Form Target II
 *
 * A string is valid if it's a prefix of some word in `words`. Returns the
 * fewest valid strings that concatenate to `target`, or -1.
 *
 * With the Z-function of each word followed by `target`, find the longest
 * valid string starting at every position of `target`. Any shorter prefix
 * is valid too, so it becomes a jump game: greedily count the jumps needed
 * to reach the end.
 *
 * @see https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-ii/
 * @difficulty Hard
 * @timeComplexity O(w · (L + n)), for w words of up to L letters
 * @spaceComplexity O(L + n)
 *
 * @example
 * minimumNumberOfValidStringsToFormTargetII(["abc", "aaaaa", "bcdef"], "aabcdabc"); // 3
 */
export const minimumNumberOfValidStringsToFormTargetII = (
	words: readonly string[],
	target: string,
): number => {
	const n = target.length;
	const reach = new Int32Array(n);
	for (const word of words) {
		const s = `${word}\u0000${target}`;
		const z = new Int32Array(s.length);
		for (let i = 1, left = 0, right = 0; i < s.length; i++) {
			let length = i < right ? Math.min(right - i, z[i - left] ?? 0) : 0;
			while (i + length < s.length && s[length] === s[i + length]) length++;
			z[i] = length;
			if (i + length > right) {
				left = i;
				right = i + length;
			}
		}
		for (let i = 0; i < n; i++)
			reach[i] = Math.max(reach[i] ?? 0, z[word.length + 1 + i] ?? 0);
	}
	let jumps = 0;
	for (let covered = 0, farthest = 0, i = 0; covered < n; jumps++) {
		for (; i <= covered && i < n; i++)
			farthest = Math.max(farthest, i + (reach[i] ?? 0));
		if (farthest <= covered) return -1;
		covered = farthest;
	}
	return jumps;
};
