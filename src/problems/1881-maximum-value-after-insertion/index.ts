/**
 * 1881. Maximum Value after Insertion
 *
 * Inserts the digit `x` into the decimal string `n` (possibly negative)
 * to make the largest value.
 *
 * For a positive number, insert before the first smaller digit; for a
 * negative one, before the first larger digit.
 *
 * @see https://leetcode.com/problems/maximum-value-after-insertion/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumValueAfterInsertion("-13", 2); // "-123"
 */
export const maximumValueAfterInsertion = (n: string, x: number): string => {
	const negative = n.startsWith("-");
	let i = negative ? 1 : 0;
	while (i < n.length && (negative ? Number(n[i]) <= x : Number(n[i]) >= x))
		i++;
	return `${n.slice(0, i)}${x}${n.slice(i)}`;
};
