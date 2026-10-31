/**
 * 3664. Two-Letter Card Game
 *
 * Each card has two letters. Two cards are compatible if both contain `x`
 * and they differ in exactly one position. Returns the most disjoint
 * compatible pairs.
 *
 * Cards with x first (and something else second) pair among themselves
 * when their second letters differ, likewise cards with x second, and
 * "xx" cards pair with any card of either group but not each other. For a
 * group with t cards, at most m sharing a letter, and c "xx" cards, the
 * best is p same-group pairs plus min(c, t - 2p) mixed pairs, which peaks
 * near p = (t - c) / 2. Try every split of the "xx" cards.
 *
 * @see https://leetcode.com/problems/two-letter-card-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * twoLetterCardGame(["aa", "ab", "ba", "ac"], "a"); // 2
 */
export const twoLetterCardGame = (
	cards: readonly string[],
	x: string,
): number => {
	const first = new Array<number>(26).fill(0);
	const second = new Array<number>(26).fill(0);
	let both = 0;
	for (const card of cards) {
		const [a = "", b = ""] = card;
		if (a === x && b === x) both++;
		else if (a === x)
			first[b.charCodeAt(0) - 97] = (first[b.charCodeAt(0) - 97] ?? 0) + 1;
		else if (b === x)
			second[a.charCodeAt(0) - 97] = (second[a.charCodeAt(0) - 97] ?? 0) + 1;
	}
	const pairs = (counts: number[], wild: number): number => {
		const total = counts.reduce((s, c) => s + c, 0);
		const most = Math.max(...counts);
		const limit = Math.min(Math.floor(total / 2), total - most);
		const value = (p: number) => p + Math.min(wild, total - 2 * p);
		const p = Math.min(limit, Math.max(0, Math.floor((total - wild) / 2)));
		return Math.max(value(p), p + 1 <= limit ? value(p + 1) : 0);
	};
	let best = 0;
	for (let toFirst = 0; toFirst <= both; toFirst++)
		best = Math.max(
			best,
			pairs(first, toFirst) + pairs(second, both - toFirst),
		);
	return best;
};
