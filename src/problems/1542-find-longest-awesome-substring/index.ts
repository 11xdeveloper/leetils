/**
 * 1542. Find Longest Awesome Substring
 *
 * Returns the length of the longest substring of the digit string `s` that
 * can be rearranged into a palindrome.
 *
 * A substring works when at most one digit has an odd count, i.e. the
 * prefix parity masks at its ends are equal or differ in one bit. Remember
 * the first position of each mask and check the eleven matching masks at
 * each step.
 *
 * @see https://leetcode.com/problems/find-longest-awesome-substring/
 * @difficulty Hard
 * @timeComplexity O(10n)
 * @spaceComplexity O(1), 1024 masks
 *
 * @example
 * findLongestAwesomeSubstring("3242415"); // 5
 */
export const findLongestAwesomeSubstring = (s: string): number => {
	const first = new Array<number>(1024).fill(Infinity);
	first[0] = -1;
	let [mask, longest] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		mask ^= 1 << (s.charCodeAt(i) - 48);
		longest = Math.max(longest, i - (first[mask] ?? Infinity));
		for (let digit = 0; digit < 10; digit++) {
			longest = Math.max(longest, i - (first[mask ^ (1 << digit)] ?? Infinity));
		}
		if ((first[mask] ?? Infinity) === Infinity) first[mask] = i;
	}
	return longest;
};
