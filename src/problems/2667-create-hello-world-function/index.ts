/**
 * 2667. Create Hello World Function
 *
 * A function that returns `"Hello World"`, whatever it's called with.
 *
 * Return a function that ignores its arguments.
 *
 * @see https://leetcode.com/problems/create-hello-world-function/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * createHelloWorldFunction()(); // "Hello World"
 */
export function createHelloWorldFunction(): (...args: unknown[]) => string {
	return () => "Hello World";
}
