/**
 * 2648. Generate Fibonacci Sequence
 *
 * A generator that yields the Fibonacci sequence forever: 0, 1, 1, 2, 3, 5…
 *
 * Keep the last two numbers and step them forward on each yield.
 *
 * @see https://leetcode.com/problems/generate-fibonacci-sequence/
 * @difficulty Easy
 * @timeComplexity O(1) per value
 * @spaceComplexity O(1)
 *
 * @example
 * const fibonacci = generateFibonacciSequence();
 * [fibonacci.next().value, fibonacci.next().value, fibonacci.next().value]; // [0, 1, 1]
 */
export function* generateFibonacciSequence(): Generator<number, void, unknown> {
	let [a, b] = [0, 1];
	for (;;) {
		yield a;
		[a, b] = [b, a + b];
	}
}
