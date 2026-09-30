/**
 * 1165. Single-Row Keyboard
 *
 * `keyboard` lists all 26 letters in a row. Typing a letter moves one finger
 * to its key, taking time equal to the distance moved. Returns the time to
 * type `word`, starting at index 0.
 *
 * Looks up each letter's position and adds up the distances.
 *
 * @see https://leetcode.com/problems/single-row-keyboard/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 letters
 *
 * @example
 * singleRowKeyboard("abcdefghijklmnopqrstuvwxyz", "cba"); // 4
 */
export const singleRowKeyboard = (keyboard: string, word: string): number => {
	const position = new Map([...keyboard].map((key, i) => [key, i]));
	let [at, time] = [0, 0];
	for (const char of word) {
		const next = position.get(char) ?? 0;
		time += Math.abs(next - at);
		at = next;
	}
	return time;
};
