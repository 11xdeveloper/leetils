/**
 * 682. Baseball Game
 *
 * Keeps score from `operations`: an integer records that score, `"+"`
 * records the sum of the last two, `"D"` doubles the last, and `"C"`
 * removes the last. Returns the sum of the recorded scores.
 *
 * A stack of scores.
 *
 * @see https://leetcode.com/problems/baseball-game/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * baseballGame(["5", "2", "C", "D", "+"]); // 30
 */
export const baseballGame = (operations: readonly string[]): number => {
	const scores: number[] = [];
	for (const operation of operations) {
		if (operation === "+")
			scores.push((scores.at(-1) ?? 0) + (scores.at(-2) ?? 0));
		else if (operation === "D") scores.push(2 * (scores.at(-1) ?? 0));
		else if (operation === "C") scores.pop();
		else scores.push(Number(operation));
	}
	return scores.reduce((total, score) => total + score, 0);
};
