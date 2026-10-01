/**
 * 1686. Stone Game VI
 *
 * Alice and Bob alternately take stones (Alice first); stone `i` is worth
 * `aliceValues[i]` to Alice and `bobValues[i]` to Bob. Returns 1 if Alice
 * wins with optimal play, -1 if Bob does, or 0 for a draw.
 *
 * Taking a stone gains its value for the taker and denies it to the
 * opponent, so both players should take stones in decreasing order of
 * `aliceValues[i] + bobValues[i]`.
 *
 * @see https://leetcode.com/problems/stone-game-vi/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * stoneGameVI([1, 3], [2, 1]); // 1
 */
export const stoneGameVI = (
	aliceValues: readonly number[],
	bobValues: readonly number[],
): number => {
	const order = aliceValues
		.map((_, i) => i)
		.sort(
			(i, j) =>
				(aliceValues[j] ?? 0) +
				(bobValues[j] ?? 0) -
				(aliceValues[i] ?? 0) -
				(bobValues[i] ?? 0),
		);
	let difference = 0;
	for (const [turn, i] of order.entries()) {
		difference += turn % 2 === 0 ? (aliceValues[i] ?? 0) : -(bobValues[i] ?? 0);
	}
	return Math.sign(difference);
};
