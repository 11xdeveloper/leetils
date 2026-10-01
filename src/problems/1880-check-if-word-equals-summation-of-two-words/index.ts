/**
 * 1880. Check if Word Equals Summation of Two Words
 *
 * Reading each word's letters as digits (`a` = 0 … `j` = 9), returns
 * whether the first two words' values sum to the third's.
 *
 * Converts each word to a number.
 *
 * @see https://leetcode.com/problems/check-if-word-equals-summation-of-two-words/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfWordEqualsSummationOfTwoWords("acb", "cba", "cdb"); // true
 */
export const checkIfWordEqualsSummationOfTwoWords = (
	firstWord: string,
	secondWord: string,
	targetWord: string,
): boolean => {
	const value = (word: string) =>
		[...word].reduce((total, char) => total * 10 + char.charCodeAt(0) - 97, 0);
	return value(firstWord) + value(secondWord) === value(targetWord);
};
