/**
 * 84. Largest Rectangle in Histogram
 *
 * Given the heights of a histogram's bars, each 1 wide, returns the area of
 * the largest rectangle that fits inside it.
 *
 * The largest rectangle is as tall as some bar and spans the bars around it
 * that are at least as tall. A stack of bar indices with increasing heights
 * finds each bar's span: when a shorter bar arrives, every taller bar popped
 * off the stack has found where its span ends on both sides.
 *
 * @see https://leetcode.com/problems/largest-rectangle-in-histogram/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestRectangleInHistogram([2, 1, 5, 6, 2, 3]); // 10, from the bars of height 5 and 6
 */
export const largestRectangleInHistogram = (
	heights: readonly number[],
): number => {
	const stack: number[] = [];
	let largest = 0;

	// A final bar of height 0 flushes everything left on the stack.
	for (let i = 0; i <= heights.length; i++) {
		const height = heights[i] ?? 0;
		while (stack.length > 0 && (heights[stack.at(-1) ?? 0] ?? 0) >= height) {
			const barHeight = heights[stack.pop() ?? 0] ?? 0;
			const left = stack.at(-1) ?? -1;
			largest = Math.max(largest, barHeight * (i - left - 1));
		}
		stack.push(i);
	}

	return largest;
};
