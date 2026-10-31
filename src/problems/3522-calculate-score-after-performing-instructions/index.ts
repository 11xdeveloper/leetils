/**
 * 3522. Calculate Score After Performing Instructions
 *
 * Starting at index 0, an `add` instruction adds `values[i]` to the score
 * and moves on one, and a `jump` moves by `values[i]`. Stops on leaving the
 * array or revisiting an instruction. Returns the score.
 *
 * Simulate, marking visited instructions.
 *
 * @see https://leetcode.com/problems/calculate-score-after-performing-instructions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * calculateScoreAfterPerformingInstructions(["jump", "add", "add", "jump", "add", "jump"], [2, 1, 3, 1, -2, -3]); // 1
 */
export const calculateScoreAfterPerformingInstructions = (
	instructions: readonly string[],
	values: readonly number[],
): number => {
	const visited = new Uint8Array(instructions.length);
	let score = 0;
	for (let i = 0; i >= 0 && i < instructions.length && !visited[i]; ) {
		visited[i] = 1;
		if (instructions[i] === "add") {
			score += values[i] ?? 0;
			i++;
		} else i += values[i] ?? 0;
	}
	return score;
};
