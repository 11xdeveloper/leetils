/**
 * 1944. Number of Visible People in a Queue
 *
 * Person `i` sees person `j > i` if everyone between is shorter than both.
 * Returns how many each person sees (heights are distinct).
 *
 * From the right, keep a stack of increasing heights: a person sees every
 * shorter person they pop, plus the first taller one left on the stack.
 *
 * @see https://leetcode.com/problems/number-of-visible-people-in-a-queue/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfVisiblePeopleInAQueue([10, 6, 8, 5, 11, 9]); // [3, 1, 2, 1, 1, 0]
 */
export const numberOfVisiblePeopleInAQueue = (
	heights: readonly number[],
): number[] => {
	const answer = new Array<number>(heights.length).fill(0);
	const stack: number[] = [];
	for (let i = heights.length - 1; i >= 0; i--) {
		const height = heights[i] ?? 0;
		let seen = 0;
		while (stack.length > 0 && (stack.at(-1) ?? 0) < height) {
			stack.pop();
			seen++;
		}
		answer[i] = seen + (stack.length > 0 ? 1 : 0);
		stack.push(height);
	}
	return answer;
};
