/**
 * 2375. Construct Smallest Number From DI String
 *
 * Returns the smallest number of distinct digits 1 to 9 whose consecutive
 * digits increase at each "I" and decrease at each "D" of `pattern`.
 *
 * Push digits in increasing order, flushing the stack (reversing runs of
 * "D") at each "I" and at the end.
 *
 * @see https://leetcode.com/problems/construct-smallest-number-from-di-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * constructSmallestNumberFromDiString("IIIDIDDD"); // "123549876"
 */
export const constructSmallestNumberFromDiString = (
	pattern: string,
): string => {
	let result = "";
	const stack: number[] = [];
	for (let i = 0; i <= pattern.length; i++) {
		stack.push(i + 1);
		if (i === pattern.length || pattern[i] === "I")
			while (stack.length) result += stack.pop();
	}
	return result;
};
