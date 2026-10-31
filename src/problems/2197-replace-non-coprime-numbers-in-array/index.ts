/**
 * 2197. Replace Non-Coprime Numbers in Array
 *
 * Repeatedly replaces two adjacent non-coprime numbers with their least
 * common multiple until none remain, and returns the result (which does
 * not depend on the order).
 *
 * Push numbers onto a stack, merging with the top while they share a
 * factor.
 *
 * @see https://leetcode.com/problems/replace-non-coprime-numbers-in-array/
 * @difficulty Hard
 * @timeComplexity O(n log max)
 * @spaceComplexity O(n)
 *
 * @example
 * replaceNonCoprimeNumbersInArray([6, 4, 3, 2, 7, 6, 2]); // [12, 7, 6]
 */
export const replaceNonCoprimeNumbersInArray = (
	nums: readonly number[],
): number[] => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const stack: number[] = [];
	for (let num of nums) {
		for (let top = stack.at(-1); top !== undefined; top = stack.at(-1)) {
			const g = gcd(top, num);
			if (g === 1) break;
			stack.pop();
			num = (top / g) * num;
		}
		stack.push(num);
	}
	return stack;
};
