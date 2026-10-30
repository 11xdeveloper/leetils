/**
 * 2953. Count Complete Substrings
 *
 * A substring is complete if each of its letters appears exactly `k`
 * times and neighbouring letters are at most 2 apart in the alphabet.
 * Returns the number of complete substrings.
 *
 * Split the word wherever neighbours are too far apart. Within each
 * piece, try every number of distinct letters `d`, sliding a window of
 * length `d · k` and counting letters that appear exactly `k` times.
 *
 * @see https://leetcode.com/problems/count-complete-substrings/
 * @difficulty Hard
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(26)
 *
 * @example
 * countCompleteSubstrings("igigee", 2); // 3
 */
export const countCompleteSubstrings = (word: string, k: number): number => {
	const countIn = (start: number, end: number): number => {
		let total = 0;
		for (
			let distinct = 1;
			distinct <= 26 && distinct * k <= end - start;
			distinct++
		) {
			const length = distinct * k;
			const counts = Array.from({ length: 26 }, () => 0);
			let exact = 0;
			const shift = (i: number, change: number): void => {
				const letter = word.charCodeAt(i) - 97;
				if (counts[letter] === k) exact--;
				counts[letter] = (counts[letter] ?? 0) + change;
				if (counts[letter] === k) exact++;
			};
			for (let i = start; i < end; i++) {
				shift(i, 1);
				if (i - start >= length) shift(i - length, -1);
				if (i - start >= length - 1 && exact === distinct) total++;
			}
		}
		return total;
	};
	let total = 0;
	let start = 0;
	for (let i = 1; i <= word.length; i++)
		if (
			i === word.length ||
			Math.abs(word.charCodeAt(i) - word.charCodeAt(i - 1)) > 2
		) {
			total += countIn(start, i);
			start = i;
		}
	return total;
};
