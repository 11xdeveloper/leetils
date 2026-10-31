/**
 * 2627. Debounce
 *
 * Wrap `fn` so a call runs `t` milliseconds later, unless another call comes
 * in first, which cancels it and starts the wait again. The last call's
 * arguments are used.
 *
 * Keep the pending timer, clearing it whenever a new call arrives.
 *
 * @see https://leetcode.com/problems/debounce/
 * @difficulty Medium
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const log = debounce(console.log, 100);
 * log("a");
 * log("b"); // only "b" is logged, 100ms later
 */
export function debounce<A extends unknown[]>(
	fn: (...args: A) => unknown,
	t: number,
): (...args: A) => void {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), t);
	};
}
