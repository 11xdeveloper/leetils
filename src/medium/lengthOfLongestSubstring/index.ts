/**
 * Given a string s, find the length of the longest substring without repeating characters.
 * A substring is a contiguous non-empty sequence of characters within a string.
 * 
 * @param s - The input string
 * @returns The length of the longest substring without repeating characters
 * 
 * @example
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3
 * 
 * @example
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1
 * 
 * @example
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 * 
 * @timeComplexity O(n) - where n is the length of the string
 * @spaceComplexity O(min(m, n)) - where m is the size of the character set
 */
export const lengthOfLongestSubstring = (s: string): number => {
    const scanner: string[] = [];
    let longest = 0;

    for (const char of s) {
        const possibleIndex = scanner.indexOf(char);

        if (possibleIndex !== -1) {
            scanner.splice(0, possibleIndex + 1);
        }
        scanner.push(char);
        longest = Math.max(longest, scanner.length);
    }

    return longest;
};
