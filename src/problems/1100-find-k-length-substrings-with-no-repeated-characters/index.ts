/**
 * 1100. Find K-Length Substrings With No Repeated Characters
 *
 * Counts the substrings of `s` of length `k` (by position) with no repeated
 * characters.
 *
 * Slides a window of `k` characters, tracking letter counts and how many
 * letters are repeated in it.
 *
 * @see https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 counts
 *
 * @example
 * findKLengthSubstringsWithNoRepeatedCharacters("havefunonleetcode", 5); // 6
 */
export const findKLengthSubstringsWithNoRepeatedCharacters = (
	s: string,
	k: number,
): number => {
	const counts = new Array<number>(26).fill(0);
	let repeated = 0;
	let found = 0;
	for (let i = 0; i < s.length; i++) {
		const entering = s.charCodeAt(i) - 97;
		counts[entering] = (counts[entering] ?? 0) + 1;
		if (counts[entering] === 2) repeated++;
		if (i >= k) {
			const leaving = s.charCodeAt(i - k) - 97;
			if (counts[leaving] === 2) repeated--;
			counts[leaving] = (counts[leaving] ?? 0) - 1;
		}
		if (i >= k - 1 && repeated === 0) found++;
	}
	return found;
};
