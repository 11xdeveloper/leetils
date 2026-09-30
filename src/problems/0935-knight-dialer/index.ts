/**
 * 935. Knight Dialer
 *
 * A chess knight hops around a phone keypad (digits 0–9 only). Counts the
 * distinct numbers of length `n` it can dial, starting on any digit, modulo
 * 10^9 + 7.
 *
 * Tracks how many numbers end on each digit, spreading the counts along
 * the knight moves from each digit for every extra hop.
 *
 * @see https://leetcode.com/problems/knight-dialer/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * knightDialer(2); // 20
 */
export const knightDialer = (n: number): number => {
	const MOD = 1_000_000_007;
	const moves = [
		[4, 6],
		[6, 8],
		[7, 9],
		[4, 8],
		[0, 3, 9],
		[],
		[0, 1, 7],
		[2, 6],
		[1, 3],
		[2, 4],
	];
	let counts = new Array<number>(10).fill(1);
	for (let hop = 1; hop < n; hop++) {
		const next = new Array<number>(10).fill(0);
		for (const [digit, count] of counts.entries()) {
			for (const to of moves[digit] ?? [])
				next[to] = ((next[to] ?? 0) + count) % MOD;
		}
		counts = next;
	}
	return counts.reduce((total, count) => (total + count) % MOD, 0);
};
