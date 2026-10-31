/**
 * 2293. Min Max Game
 *
 * Repeatedly halves `nums` (length a power of 2): pair `i` becomes the
 * minimum of its pair for even `i` and the maximum for odd `i`. Returns
 * the last number.
 *
 * Simulate the rounds.
 *
 * @see https://leetcode.com/problems/min-max-game/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minMaxGame([1, 3, 5, 2, 4, 8, 2, 2]); // 1
 */
export const minMaxGame = (nums: readonly number[]): number => {
	let round = [...nums];
	while (round.length > 1) {
		round = Array.from({ length: round.length / 2 }, (_, i) => {
			const [a = 0, b = 0] = [round[2 * i], round[2 * i + 1]];
			return i % 2 ? Math.max(a, b) : Math.min(a, b);
		});
	}
	return round[0] ?? 0;
};
