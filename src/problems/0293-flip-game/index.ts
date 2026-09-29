/**
 * 293. Flip Game
 *
 * Returns every state reachable in one move of the Flip Game from
 * `currentState`, a string of `+` and `-`, where a move flips two
 * consecutive `++` into `--`.
 *
 * Tries flipping at every position where `++` starts.
 *
 * @see https://leetcode.com/problems/flip-game/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2) for the returned states
 *
 * @example
 * flipGame("++++"); // ["--++", "+--+", "++--"]
 */
export const flipGame = (currentState: string): string[] => {
	const states: string[] = [];
	for (let i = 0; i + 1 < currentState.length; i++) {
		if (currentState[i] === "+" && currentState[i + 1] === "+") {
			states.push(`${currentState.slice(0, i)}--${currentState.slice(i + 2)}`);
		}
	}
	return states;
};
