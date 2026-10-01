/**
 * 754. Reach a Number
 *
 * Starting at 0 on a number line, move `i` steps left or right on move `i`.
 * Returns the fewest moves to land exactly on `target`.
 *
 * By symmetry only `|target|` matters. After `k` moves all to the right the
 * position is `k(k + 1)/2`; flipping move `i` to the left subtracts `2i`,
 * so any position below that with the same parity is reachable. The answer
 * is the first `k` whose sum reaches the target with an even surplus.
 *
 * @see https://leetcode.com/problems/reach-a-number/
 * @difficulty Medium
 * @timeComplexity O(√target)
 * @spaceComplexity O(1)
 *
 * @example
 * reachANumber(2); // 3: 1 - 2 + 3
 */
export const reachANumber = (target: number): number => {
	const goal = Math.abs(target);
	let moves = 0;
	let position = 0;
	while (position < goal || (position - goal) % 2 !== 0) {
		moves++;
		position += moves;
	}
	return moves;
};
