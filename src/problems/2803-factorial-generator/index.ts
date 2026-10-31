/**
 * 2803. Factorial Generator
 *
 * A generator over the factorials 1!, 2!, …, n!. For `n = 0` it yields just
 * 0! = 1.
 *
 * Multiply a running product by each number in turn.
 *
 * @see https://leetcode.com/problems/factorial-generator/
 * @difficulty Easy
 * @timeComplexity O(1) per value
 * @spaceComplexity O(1)
 *
 * @example
 * [...factorialGenerator(5)]; // [1, 2, 6, 24, 120]
 */
export function* factorialGenerator(
	n: number,
): Generator<number, void, unknown> {
	if (n === 0) {
		yield 1;
		return;
	}
	let product = 1;
	for (let i = 1; i <= n; i++) {
		product *= i;
		yield product;
	}
}
