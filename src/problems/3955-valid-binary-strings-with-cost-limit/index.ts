/**
 * 3955. Valid Binary Strings With Cost Limit
 *
 * Lists, in lexicographic order, the binary strings of length `n` with no
 * two adjacent 1s whose 1s' indices add up to at most `k`.
 *
 * Backtrack, placing 0 before 1 and pruning once the cost is exceeded.
 *
 * @see https://leetcode.com/problems/valid-binary-strings-with-cost-limit/
 * @difficulty Medium
 * @timeComplexity O(F(n) · n), for the Fibonacci number F(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validBinaryStringsWithCostLimit(3, 1); // ["000", "010", "100"]
 */
export const validBinaryStringsWithCostLimit = (
	n: number,
	k: number,
): string[] => {
	const results: string[] = [];
	const build = (prefix: string, cost: number): void => {
		const i = prefix.length;
		if (i === n) {
			results.push(prefix);
			return;
		}
		build(`${prefix}0`, cost);
		if (prefix.at(-1) !== "1" && cost + i <= k) build(`${prefix}1`, cost + i);
	};
	build("", 0);
	return results;
};
