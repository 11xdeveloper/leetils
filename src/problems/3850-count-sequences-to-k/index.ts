/**
 * 3850. Count Sequences to K
 *
 * Starting from 1, each element of `nums` (from 1 to 6) multiplies,
 * divides or leaves the value. Counts the choice sequences ending exactly
 * at `k`.
 *
 * Every value is 2^a · 3^b · 5^c, so count sequences by those exponents,
 * and match k's own (k with any other prime factor is unreachable).
 *
 * @see https://leetcode.com/problems/count-sequences-to-k/
 * @difficulty Hard
 * @timeComplexity O(n⁴)
 * @spaceComplexity O(n³)
 *
 * @example
 * countSequencesToK([2, 3, 2], 6); // 2
 */
export const countSequencesToK = (
	nums: readonly number[],
	k: number,
): number => {
	const exponents = (x: number): [number, number, number, number] => {
		const powers = [2, 3, 5].map((p) => {
			let e = 0;
			while (x % p === 0) {
				x /= p;
				e++;
			}
			return e;
		});
		return [powers[0] ?? 0, powers[1] ?? 0, powers[2] ?? 0, x];
	};
	const [ka, kb, kc, rest] = exponents(k);
	if (rest !== 1) return 0;
	let ways = new Map<string, number>([["0,0,0", 1]]);
	for (const num of nums) {
		const [da, db, dc] = exponents(num);
		const next = new Map<string, number>();
		for (const [key, count] of ways) {
			const [a = 0, b = 0, c = 0] = key.split(",").map(Number);
			for (const sign of [-1, 0, 1]) {
				const state = `${a + sign * da},${b + sign * db},${c + sign * dc}`;
				next.set(state, (next.get(state) ?? 0) + count);
			}
		}
		ways = next;
	}
	return ways.get(`${ka},${kb},${kc}`) ?? 0;
};
