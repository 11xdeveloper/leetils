/**
 * 854. K-Similar Strings
 *
 * `s1` and `s2` are anagrams. Returns the fewest swaps of two letters in
 * `s1` that turn it into `s2`.
 *
 * Breadth-first search over strings. From each string it only fixes the
 * first mismatched position, swapping in a letter from later on that
 * belongs there and isn't already in place. Some optimal sequence always
 * fixes that position next, so this keeps the search small.
 *
 * @see https://leetcode.com/problems/k-similar-strings/
 * @difficulty Hard
 * @timeComplexity O(n · m!) in the worst case for m mismatched positions, far less in practice
 * @spaceComplexity O(n · m!) for the strings explored
 *
 * @example
 * kSimilarStrings("abc", "bca"); // 2
 */
export const kSimilarStrings = (s1: string, s2: string): number => {
	const seen = new Set([s1]);
	let frontier = [s1];
	for (let swaps = 0; frontier.length > 0; swaps++) {
		const next: string[] = [];
		for (const current of frontier) {
			if (current === s2) return swaps;
			let i = 0;
			while (current.charAt(i) === s2.charAt(i)) i++;
			for (let j = i + 1; j < current.length; j++) {
				if (
					current.charAt(j) !== s2.charAt(i) ||
					current.charAt(j) === s2.charAt(j)
				)
					continue;
				const chars = [...current];
				[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
				const swapped = chars.join("");
				if (!seen.has(swapped)) {
					seen.add(swapped);
					next.push(swapped);
				}
			}
		}
		frontier = next;
	}
	return -1;
};
