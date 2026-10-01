const A = "a".charCodeAt(0);

/**
 * 49. Group Anagrams
 *
 * Groups the strings in `strs`, which contain only lowercase English letters,
 * so that anagrams of each other are together. Groups are in the order their
 * first string appears, and strings keep their order within a group.
 *
 * Two strings are anagrams exactly when they have the same letter counts, so
 * the counts make a key for grouping them. Counting takes O(k) per string,
 * where sorting its letters would take O(k log k).
 *
 * @see https://leetcode.com/problems/group-anagrams/
 * @difficulty Medium
 * @timeComplexity O(n * k) where k is the length of the longest string
 * @spaceComplexity O(n * k)
 *
 * @example
 * groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]); // [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
 */
export const groupAnagrams = (strs: readonly string[]): string[][] => {
	const groups = new Map<string, string[]>();

	for (const str of strs) {
		const counts = new Array<number>(26).fill(0);
		for (let i = 0; i < str.length; i++) {
			const letter = str.charCodeAt(i) - A;
			counts[letter] = (counts[letter] ?? 0) + 1;
		}

		const key = counts.join(",");
		const group = groups.get(key);
		if (group) group.push(str);
		else groups.set(key, [str]);
	}

	return [...groups.values()];
};
