/**
 * 2868. The Wording Game
 *
 * Alice and Bob each hold a sorted list of words. Alice opens with her
 * smallest word; then players alternate playing a word that is
 * lexicographically greater than the last and starts with the same
 * letter or the next one. A player who can't move loses. Returns whether
 * Alice wins with both playing optimally.
 *
 * Playing the smallest legal word is optimal, so walk both lists with a
 * pointer each: words passed over can never become legal again.
 *
 * @see https://leetcode.com/problems/the-wording-game/
 * @difficulty Hard
 * @timeComplexity O(total length)
 * @spaceComplexity O(1)
 *
 * @example
 * theWordingGame(["ananas", "atlas", "banana"], ["albatros", "cikla", "nogomet"]); // true
 */
export const theWordingGame = (
	a: readonly string[],
	b: readonly string[],
): boolean => {
	const lists = [a, b];
	const next = [1, 0];
	let last = a[0] ?? "";
	for (let turn = 1; ; turn = 1 - turn) {
		const words = lists[turn] ?? [];
		let played = false;
		for (let i = next[turn] ?? 0; i < words.length; i++) {
			const word = words[i] ?? "";
			const step = word.charCodeAt(0) - last.charCodeAt(0);
			if ((step === 0 && word > last) || step === 1) {
				last = word;
				next[turn] = i + 1;
				played = true;
				break;
			}
		}
		if (!played) return turn === 1;
	}
};
