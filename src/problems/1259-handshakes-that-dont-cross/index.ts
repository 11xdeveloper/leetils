/**
 * 1259. Handshakes That Don't Cross
 *
 * Returns the number of ways `numPeople` people (an even number) around a
 * circle can pair off to shake hands without any handshakes crossing,
 * modulo 10^9 + 7.
 *
 * Person 1 shakes hands with someone, leaving an even number of people on
 * each side who must pair up among themselves. That gives the Catalan
 * recurrence `ways[n] = Σ ways[k] · ways[n − 2 − k]`.
 *
 * @see https://leetcode.com/problems/handshakes-that-dont-cross/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * handshakesThatDontCross(6); // 5
 */
export const handshakesThatDontCross = (numPeople: number): number => {
	const MOD = 1_000_000_007n;
	const ways = new Array<bigint>(numPeople + 1).fill(0n);
	ways[0] = 1n;
	for (let n = 2; n <= numPeople; n += 2) {
		let total = 0n;
		for (let left = 0; left <= n - 2; left += 2) {
			total += (ways[left] ?? 0n) * (ways[n - 2 - left] ?? 0n);
		}
		ways[n] = total % MOD;
	}
	return Number(ways[numPeople] ?? 0n);
};
