import { Heap } from "../../internal/heap";

/**
 * 1792. Maximum Average Pass Ratio
 *
 * Each class `[pass, total]` can receive extra students who always pass.
 * Assigning `extraStudents`, returns the largest average pass ratio.
 *
 * The gain from one more student, `(p + 1)/(t + 1) − p/t`, shrinks as a
 * class grows, so greedily give each student to the class with the
 * biggest gain, using a max-heap.
 *
 * @see https://leetcode.com/problems/maximum-average-pass-ratio/
 * @difficulty Medium
 * @timeComplexity O((n + e) log n) for e extra students
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAveragePassRatio([[1, 2], [3, 5], [2, 2]], 2); // 0.78333
 */
export const maximumAveragePassRatio = (
	classes: readonly (readonly number[])[],
	extraStudents: number,
): number => {
	const gain = ([pass, total]: readonly [number, number]) =>
		(pass + 1) / (total + 1) - pass / total;
	const heap = new Heap<[number, number]>(
		(a, b) => gain(b) - gain(a),
		classes.map(([pass = 0, total = 1]) => [pass, total]),
	);
	for (let student = 0; student < extraStudents; student++) {
		const [pass, total] = heap.pop() ?? [0, 1];
		heap.push([pass + 1, total + 1]);
	}
	let sum = 0;
	for (let entry = heap.pop(); entry; entry = heap.pop())
		sum += entry[0] / entry[1];
	return sum / classes.length;
};
