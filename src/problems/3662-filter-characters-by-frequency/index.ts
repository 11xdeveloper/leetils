/**
 * 3662. Filter Characters by Frequency
 *
 * Keeps the characters of `s` that appear fewer than `k` times in it, in
 * their original order.
 *
 * @see https://leetcode.com/problems/filter-characters-by-frequency/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * filterCharactersByFrequency("aadbbcccca", 3); // "dbb"
 */
export const filterCharactersByFrequency = (s: string, k: number): string => {
	const counts = new Map<string, number>();
	for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
	return [...s].filter((c) => (counts.get(c) ?? 0) < k).join("");
};
