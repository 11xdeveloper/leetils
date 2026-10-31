/**
 * 3227. Vowels Game in a String
 *
 * Alice removes a substring with an odd number of vowels, then Bob one with
 * an even number, and so on; whoever can't move loses. Returns whether
 * Alice wins.
 *
 * With no vowels Alice can't start. Otherwise she wins: an odd count she
 * takes whole, and from an even count she leaves exactly one vowel, which
 * Bob can't remove and she takes next turn.
 *
 * @see https://leetcode.com/problems/vowels-game-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * vowelsGameInAString("leetcoder"); // true
 */
export const vowelsGameInAString = (s: string): boolean => /[aeiou]/.test(s);
