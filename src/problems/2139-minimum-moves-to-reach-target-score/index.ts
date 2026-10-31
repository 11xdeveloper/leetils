/**
 * 2139. Minimum Moves to Reach Target Score
 *
 * Starting from 1, a move adds 1 or (at most `maxDoubles` times) doubles.
 * Returns the fewest moves to reach `target`.
 *
 * Work backwards: halve an even number while doubles remain (doubling
 * late gains the most), otherwise subtract 1; once out of doubles, the
 * rest is counting down.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-reach-target-score/
 * @difficulty Medium
 * @timeComplexity O(min(maxDoubles, log target))
 * @spaceComplexity O(1)
 *
 * @example
 * minimumMovesToReachTargetScore(19, 2); // 7
 */
export const minimumMovesToReachTargetScore = (
	target: number,
	maxDoubles: number,
): number => {
	let moves = 0;
	while (target > 1 && maxDoubles > 0) {
		if (target % 2) target--;
		else {
			target /= 2;
			maxDoubles--;
		}
		moves++;
	}
	return moves + target - 1;
};
