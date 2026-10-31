/**
 * 2645. Minimum Additions to Make Valid String
 *
 * Returns the fewest letters to insert into `word`, made of `a`, `b` and
 * `c`, so it becomes "abc" repeated.
 *
 * A new copy of "abc" starts wherever a letter doesn't come after the
 * previous one; fill each copy out to three letters.
 *
 * @see https://leetcode.com/problems/minimum-additions-to-make-valid-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAdditionsToMakeValidString("aaa"); // 6
 */
export const minimumAdditionsToMakeValidString = (word: string): number => {
	let copies = 1;
	for (let i = 1; i < word.length; i++)
		if (word.charAt(i) <= word.charAt(i - 1)) copies++;
	return 3 * copies - word.length;
};
