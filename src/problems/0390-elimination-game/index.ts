/**
 * 390. Elimination Game
 *
 * Starting with 1 to `n`, removes every other number from left to right
 * (starting with the first), then every other number from right to left,
 * alternating until one number remains, and returns it.
 *
 * The remaining numbers are always an arithmetic sequence, so only its
 * first element, step and length need tracking. The first element changes
 * when removing from the left, or from the right with an odd count; each
 * round doubles the step and halves the count.
 *
 * @see https://leetcode.com/problems/elimination-game/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * eliminationGame(9); // 6
 */
export const eliminationGame = (n: number): number => {
	let first = 1;
	let step = 1;
	let remaining = n;
	let fromLeft = true;

	while (remaining > 1) {
		if (fromLeft || remaining % 2 === 1) first += step;
		step *= 2;
		remaining = Math.floor(remaining / 2);
		fromLeft = !fromLeft;
	}

	return first;
};
