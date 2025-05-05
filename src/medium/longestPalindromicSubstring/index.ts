/**
 * Given a string s, return the longest palindromic substring in s.
 * 
 * @param s - The input string
 * @returns The longest palindromic substring
 * 
 * @example
 * Input: s = "babad"
 * Output: "bab" or "aba"
 * 
 * @example
 * Input: s = "cbbd"
 * Output: "bb"
 */
export function longestPalindrome(s: string): string {
    if (s.length <= 1) return s;

    let start = 0;
    let maxLength = 1;

    // Helper function to expand around center
    function expandAroundCenter(left: number, right: number): void {
        let l = left;
        let r = right;
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            const currentLength = r - l + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                start = l;
            }
            l--;
            r++;
        }
    }

    // Check all possible centers
    for (let i = 0; i < s.length; i++) {
        // Check for odd length palindromes
        expandAroundCenter(i, i);
        // Check for even length palindromes
        expandAroundCenter(i, i + 1);
    }

    return s.substring(start, start + maxLength);
}