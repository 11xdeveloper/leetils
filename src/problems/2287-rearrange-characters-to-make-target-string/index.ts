/**
 * 2287. Rearrange Characters to Make Target String
 *
 * Returns how many copies of `target` can be made from the letters of `s`.
 *
 * Each letter of `target` limits the copies by its supply in `s`.
 *
 * @see https://leetcode.com/problems/rearrange-characters-to-make-target-string/
 * @difficulty Easy
 * @timeComplexity O(n + t)
 * @spaceComplexity O(1)
 *
 * @example
 * rearrangeCharactersToMakeTargetString("ilovecodingonleetcode", "code"); // 2
 */
export const rearrangeCharactersToMakeTargetString = (
	s: string,
	target: string,
): number => {
	const count = (text: string): Map<string, number> => {
		const counts = new Map<string, number>();
		for (const char of text) counts.set(char, (counts.get(char) ?? 0) + 1);
		return counts;
	};
	const [available, needed] = [count(s), count(target)];
	return Math.min(
		...[...needed].map(([char, need]) =>
			Math.floor((available.get(char) ?? 0) / need),
		),
	);
};
