/**
 * 1003. Check If Word Is Valid After Substitutions
 *
 * Starting from an empty string, each step inserts `"abc"` anywhere.
 * Returns whether `s` can be built this way.
 *
 * Undoing the steps: a stack of letters, where every `c` must complete an
 * `ab` on top of the stack, which is then removed. Valid strings leave the
 * stack empty.
 *
 * @see https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfWordIsValidAfterSubstitutions("aabcbc"); // true
 */
export const checkIfWordIsValidAfterSubstitutions = (s: string): boolean => {
	const stack: string[] = [];
	for (const char of s) {
		if (char !== "c") {
			stack.push(char);
			continue;
		}
		if (stack.pop() !== "b" || stack.pop() !== "a") return false;
	}
	return stack.length === 0;
};
