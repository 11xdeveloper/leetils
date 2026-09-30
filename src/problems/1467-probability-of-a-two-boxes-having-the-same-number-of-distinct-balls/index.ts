/**
 * 1467. Probability of a Two Boxes Having The Same Number of Distinct Balls
 *
 * `balls[i]` balls have colour `i`. After a uniformly random shuffle, the
 * first half go in one box and the rest in the other. Returns the
 * probability that both boxes hold the same number of colours.
 *
 * A split that puts `x_i` balls of each colour in the first box happens with
 * probability `Π C(balls[i], x_i) / C(2n, n)`. Searching every split (at
 * most 7^8) and adding up the qualifying ones gives the answer.
 *
 * @see https://leetcode.com/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls/
 * @difficulty Hard
 * @timeComplexity O(Π (balls[i] + 1))
 * @spaceComplexity O(k) for k colours
 *
 * @example
 * probabilityOfATwoBoxesHavingTheSameNumberOfDistinctBalls([2, 1, 1]); // 0.6666666666666666
 */
export const probabilityOfATwoBoxesHavingTheSameNumberOfDistinctBalls = (
	balls: readonly number[],
): number => {
	const total = balls.reduce((sum, count) => sum + count, 0);
	const choose = (n: number, k: number) => {
		let result = 1;
		for (let i = 1; i <= k; i++) result = (result * (n - k + i)) / i;
		return result;
	};
	const split = (
		colour: number,
		first: number,
		distinct: number,
		weight: number,
	): number => {
		if (colour === balls.length)
			return first === total / 2 && distinct === 0 ? weight : 0;
		const count = balls[colour] ?? 0;
		let sum = 0;
		for (let x = 0; x <= count && first + x <= total / 2; x++) {
			// distinct tracks colours in the first box minus colours in the second.
			const change = (x > 0 ? 1 : 0) - (x < count ? 1 : 0);
			sum += split(
				colour + 1,
				first + x,
				distinct + change,
				weight * choose(count, x),
			);
		}
		return sum;
	};
	return split(0, 0, 0, 1) / choose(total, total / 2);
};
