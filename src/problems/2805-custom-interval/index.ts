/**
 * 2805. Custom Interval
 *
 * Call `fn` repeatedly, waiting `delay + period · k` milliseconds before
 * call k (counting from 0), so the gaps grow by `period` each time.
 * LeetCode pairs this with `customClearInterval(id)`; here `customInterval`
 * returns the function that stops the calls instead.
 *
 * Chain timeouts, each scheduling the next with a longer wait.
 *
 * @see https://leetcode.com/problems/custom-interval/
 * @difficulty Medium
 * @timeComplexity O(1) per call
 * @spaceComplexity O(1)
 *
 * @example
 * const clear = customInterval(console.log, 50, 20);
 * setTimeout(clear, 225); // logs at 50, 120 and 210ms
 */
export function customInterval(
	fn: () => unknown,
	delay: number,
	period: number,
): () => void {
	let timer: ReturnType<typeof setTimeout>;
	const schedule = (count: number): void => {
		timer = setTimeout(
			() => {
				fn();
				schedule(count + 1);
			},
			delay + period * count,
		);
	};
	schedule(0);
	return () => clearTimeout(timer);
}
