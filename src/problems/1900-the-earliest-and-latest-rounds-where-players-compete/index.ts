/**
 * 1900. The Earliest and Latest Rounds Where Players Compete
 *
 * In each round of `n` players, the `i`-th from the front plays the `i`-th
 * from the back. `firstPlayer` and `secondPlayer` beat everyone else, and
 * every other match can go either way. Returns the earliest and latest
 * rounds in which the two meet.
 *
 * Only the two players' positions and the row length matter. A memoised
 * search tries every outcome of the other matches, counting how many
 * survivors land before, between and after the two to get their next
 * positions.
 *
 * @see https://leetcode.com/problems/the-earliest-and-latest-rounds-where-players-compete/
 * @difficulty Hard
 * @timeComplexity O(n^3 · 2^(n/2)) in the worst case, far less with memoisation
 * @spaceComplexity O(n^3)
 *
 * @example
 * theEarliestAndLatestRoundsWherePlayersCompete(11, 2, 4); // [3, 4]
 */
export const theEarliestAndLatestRoundsWherePlayersCompete = (
	n: number,
	firstPlayer: number,
	secondPlayer: number,
): number[] => {
	const memo = new Map<number, [number, number]>();
	const play = (size: number, a: number, b: number): [number, number] => {
		if (a + b === size + 1) return [1, 1];
		const key = (size * 32 + a) * 32 + b;
		const cached = memo.get(key);
		if (cached) return cached;
		const pairs = Math.floor(size / 2);
		let [earliest, latest] = [Infinity, 0];
		for (let mask = 0; mask < 1 << pairs; mask++) {
			// Bit i set: the front player of pair i wins.
			const survivors: number[] = [];
			let valid = true;
			for (let i = 1; i <= pairs; i++) {
				const [front, back] = [i, size + 1 - i];
				const frontWins = (mask >> (i - 1)) & 1;
				if (front === a || front === b) {
					if (!frontWins) valid = false;
				} else if (back === a || back === b) {
					if (frontWins) valid = false;
				}
				survivors.push(frontWins ? front : back);
			}
			if (!valid) continue;
			if (size % 2 === 1) survivors.push(pairs + 1);
			survivors.sort((x, y) => x - y);
			const [nextA, nextB] = [
				survivors.indexOf(a) + 1,
				survivors.indexOf(b) + 1,
			];
			const [low, high] = play(survivors.length, nextA, nextB);
			earliest = Math.min(earliest, low + 1);
			latest = Math.max(latest, high + 1);
		}
		const result: [number, number] = [earliest, latest];
		memo.set(key, result);
		return result;
	};
	return play(n, firstPlayer, secondPlayer);
};
