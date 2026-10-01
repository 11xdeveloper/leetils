/**
 * 1769. Minimum Number of Operations to Move All Balls to Each Box
 *
 * For each box, returns how many single-step moves bring every ball (the
 * `1`s in `boxes`) into it.
 *
 * Sweep left then right: moving the target one box further adds one step
 * for every ball already passed.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMoveAllBallsToEachBox("001011"); // [11, 8, 5, 4, 3, 4]
 */
export const minimumNumberOfOperationsToMoveAllBallsToEachBox = (
	boxes: string,
): number[] => {
	const n = boxes.length;
	const answer = new Array<number>(n).fill(0);
	for (const direction of [1, -1]) {
		let [balls, cost] = [0, 0];
		for (let step = 0; step < n; step++) {
			const i = direction === 1 ? step : n - 1 - step;
			cost += balls;
			answer[i] = (answer[i] ?? 0) + cost;
			if (boxes[i] === "1") balls++;
		}
	}
	return answer;
};
