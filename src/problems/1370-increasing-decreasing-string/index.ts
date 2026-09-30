/**
 * 1370. Increasing Decreasing String
 *
 * Reorders `s` by repeatedly taking one of each remaining letter in
 * ascending order, then one of each in descending order, until none are
 * left.
 *
 * Counts the letters, then sweeps up and down the alphabet taking one of
 * each letter still available.
 *
 * @see https://leetcode.com/problems/increasing-decreasing-string/
 * @difficulty Easy
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * increasingDecreasingString("aaaabbbbcccc"); // "abccbaabccba"
 */
export const increasingDecreasingString = (s: string): string => {
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		counts[letter] = (counts[letter] ?? 0) + 1;
	}
	let result = "";
	const take = (letter: number) => {
		if ((counts[letter] ?? 0) === 0) return;
		counts[letter] = (counts[letter] ?? 0) - 1;
		result += String.fromCharCode(97 + letter);
	};
	while (result.length < s.length) {
		for (let letter = 0; letter < 26; letter++) take(letter);
		for (let letter = 25; letter >= 0; letter--) take(letter);
	}
	return result;
};
