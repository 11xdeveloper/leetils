/**
 * 4062. Transform Array Using Pair Operations
 *
 * An operation sets `source[j]` to any value, moving the difference into
 * `source[i]`. Whether `source` can become `target`.
 *
 * Operations keep the total, and with two or more entries they can set
 * every entry but one freely, so only the totals need to match.
 *
 * @see https://leetcode.com/problems/transform-array-using-pair-operations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * transformArrayUsingPairOperations([1, 2, 3], [0, 2, 4]); // true
 */
export const transformArrayUsingPairOperations = (
	source: readonly number[],
	target: readonly number[],
): boolean =>
	source.reduce((a, b) => a + b, 0) === target.reduce((a, b) => a + b, 0);
