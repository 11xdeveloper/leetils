/**
 * 1776. Car Fleet II
 *
 * Cars `[position, speed]` drive right along a road in position order; a
 * car catching the one ahead joins it at the slower speed. Returns when
 * each car first hits the car ahead, or -1.
 *
 * Process cars from the back of the line (rightmost first) with a stack of
 * cars it might hit. A car can't hit one that is at least as fast, nor one
 * that has already merged into a car ahead before they would meet; pop
 * those, and the stack top is what it hits.
 *
 * @see https://leetcode.com/problems/car-fleet-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * carFleetII([[3, 4], [5, 4], [6, 3], [9, 1]]); // [2, 1, 1.5, -1]
 */
export const carFleetII = (cars: readonly (readonly number[])[]): number[] => {
	const answer = new Array<number>(cars.length).fill(-1);
	const stack: number[] = [];
	for (let i = cars.length - 1; i >= 0; i--) {
		const [position = 0, speed = 0] = cars[i] ?? [];
		while (stack.length > 0) {
			const j = stack.at(-1) ?? 0;
			const [ahead = 0, aheadSpeed = 0] = cars[j] ?? [];
			const meet = (ahead - position) / (speed - aheadSpeed);
			const merged = answer[j] ?? -1;
			if (speed <= aheadSpeed || (merged !== -1 && meet >= merged)) stack.pop();
			else break;
		}
		const j = stack.at(-1);
		if (j !== undefined) {
			const [ahead = 0, aheadSpeed = 0] = cars[j] ?? [];
			answer[i] = (ahead - position) / (speed - aheadSpeed);
		}
		stack.push(i);
	}
	return answer;
};
