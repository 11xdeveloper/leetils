/**
 * 1781. Sum of Beauty of All Substrings
 *
 * A string's beauty is its most frequent letter's count minus its least
 * frequent (present) letter's count. Returns the total beauty of all
 * substrings of `s`.
 *
 * Extend each start one character at a time, updating letter counts and
 * reading the extremes from the 26 counts.
 *
 * @see https://leetcode.com/problems/sum-of-beauty-of-all-substrings/
 * @difficulty Medium
 * @timeComplexity O(26 · n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfBeautyOfAllSubstrings("aabcb"); // 5
 */
export const sumOfBeautyOfAllSubstrings = (s: string): number => {
	let total = 0;
	for (let start = 0; start < s.length; start++) {
		const counts = new Array<number>(26).fill(0);
		for (let end = start; end < s.length; end++) {
			const letter = s.charCodeAt(end) - 97;
			counts[letter] = (counts[letter] ?? 0) + 1;
			let [most, least] = [0, Infinity];
			for (const count of counts) {
				if (count === 0) continue;
				most = Math.max(most, count);
				least = Math.min(least, count);
			}
			total += most - least;
		}
	}
	return total;
};
