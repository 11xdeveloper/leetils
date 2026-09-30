/**
 * 1156. Swap For Longest Repeated Character Substring
 *
 * Returns the length of the longest run of one repeated character in
 * `text` after swapping at most one pair of characters.
 *
 * Splits `text` into runs. A run can grow by one by swapping in a copy of
 * its character from elsewhere, and two runs of the same character with a
 * single other character between them can be joined by swapping that
 * character out. Either way the length is capped by how many copies of the
 * character there are.
 *
 * @see https://leetcode.com/problems/swap-for-longest-repeated-character-substring/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * swapForLongestRepeatedCharacterSubstring("aaabaaa"); // 6
 */
export const swapForLongestRepeatedCharacterSubstring = (
	text: string,
): number => {
	const total = new Map<string, number>();
	for (const char of text) total.set(char, (total.get(char) ?? 0) + 1);
	const runs: [char: string, length: number][] = [];
	for (const char of text) {
		const last = runs.at(-1);
		if (last?.[0] === char) last[1]++;
		else runs.push([char, 1]);
	}
	let best = 0;
	runs.forEach(([char, length], i) => {
		const available = total.get(char) ?? 0;
		best = Math.max(best, Math.min(length + 1, available));
		const [gap, after] = [runs[i + 1], runs[i + 2]];
		if (gap?.[1] === 1 && after?.[0] === char) {
			best = Math.max(best, Math.min(length + after[1] + 1, available));
		}
	});
	return best;
};
