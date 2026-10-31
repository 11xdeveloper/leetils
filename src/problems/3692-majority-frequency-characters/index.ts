/**
 * 3692. Majority Frequency Characters
 *
 * Group the letters of `s` by how often they appear. Returns the letters
 * of the largest group (the one with the higher frequency on ties).
 *
 * @see https://leetcode.com/problems/majority-frequency-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * majorityFrequencyCharacters("aaabbbccdddde"); // "ab"
 */
export const majorityFrequencyCharacters = (s: string): string => {
	const counts = new Map<string, number>();
	for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
	const groups = new Map<number, string[]>();
	for (const [c, count] of counts)
		groups.set(count, [...(groups.get(count) ?? []), c]);
	let [bestFrequency, best] = [0, [] as string[]];
	for (const [frequency, letters] of groups)
		if (
			letters.length > best.length ||
			(letters.length === best.length && frequency > bestFrequency)
		)
			[bestFrequency, best] = [frequency, letters];
	return best.join("");
};
