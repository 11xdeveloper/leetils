/**
 * 2011. Final Value of Variable After Performing Operations
 *
 * Returns the value of `X`, starting at 0, after the operations `++X`,
 * `X++`, `--X` and `X--`.
 *
 * Each operation's middle character says whether it adds or subtracts.
 *
 * @see https://leetcode.com/problems/final-value-of-variable-after-performing-operations/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * finalValueOfVariableAfterPerformingOperations(["--X", "X++", "X++"]); // 1
 */
export const finalValueOfVariableAfterPerformingOperations = (
	operations: readonly string[],
): number =>
	operations.reduce((x, operation) => x + (operation[1] === "+" ? 1 : -1), 0);
