/**
 * 1320. Minimum Distance to Type a Word Using Two Fingers
 *
 * On a keyboard with letter `i` at row `⌊i / 6⌋`, column `i mod 6`, returns
 * the least total finger travel (Manhattan distance) to type `word` with
 * two fingers, which start wherever is most convenient.
 *
 * Dynamic programming over the letters: one finger is always on the last
 * letter typed, so the state is where the other finger is (or that it
 * hasn't been used yet). Each letter is typed by one finger or the other.
 *
 * @see https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers/
 * @difficulty Hard
 * @timeComplexity O(26n)
 * @spaceComplexity O(26)
 *
 * @example
 * minimumDistanceToTypeAWordUsingTwoFingers("HAPPY"); // 6
 */
export const minimumDistanceToTypeAWordUsingTwoFingers = (
	word: string,
): number => {
	const FREE = 26;
	const distance = (from: number, to: number) =>
		from === FREE
			? 0
			: Math.abs(Math.floor(from / 6) - Math.floor(to / 6)) +
				Math.abs((from % 6) - (to % 6));
	// best[other] is the least travel so far with the idle finger on `other`.
	let best = new Array<number>(27).fill(Infinity);
	best[FREE] = 0;
	for (let i = 1; i < word.length; i++) {
		const [previous, current] = [
			word.charCodeAt(i - 1) - 65,
			word.charCodeAt(i) - 65,
		];
		const next = new Array<number>(27).fill(Infinity);
		best.forEach((cost, other) => {
			if (cost === Infinity) return;
			// The finger on the previous letter moves on, the other stays put.
			next[other] = Math.min(
				next[other] ?? Infinity,
				cost + distance(previous, current),
			);
			// The other finger types it, leaving the first finger on the previous letter.
			next[previous] = Math.min(
				next[previous] ?? Infinity,
				cost + distance(other, current),
			);
		});
		best = next;
	}
	return Math.min(...best);
};
