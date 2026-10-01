const MOD = 1_000_000_007n;

/**
 * 1916. Count Ways to Build Rooms in an Ant Colony
 *
 * Room `i` can only be built after `prevRoom[i]` (room 0 is built).
 * Counts the build orders, modulo 10^9 + 7.
 *
 * Orders of a tree that respect parent-before-child number
 * `n! / Π subtree sizes`. Compute subtree sizes from the leaves up (in
 * reverse breadth-first order), then divide with modular inverses.
 *
 * @see https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony/
 * @difficulty Hard
 * @timeComplexity O(n log MOD)
 * @spaceComplexity O(n)
 *
 * @example
 * countWaysToBuildRoomsInAnAntColony([-1, 0, 0, 1, 2]); // 6
 */
export const countWaysToBuildRoomsInAnAntColony = (
	prevRoom: readonly number[],
): number => {
	const n = prevRoom.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (let room = 1; room < n; room++)
		children[prevRoom[room] ?? 0]?.push(room);
	const order = [0];
	for (let i = 0; i < order.length; i++)
		order.push(...(children[order[i] ?? 0] ?? []));
	const size = new Array<number>(n).fill(1);
	for (let i = n - 1; i > 0; i--) {
		const room = order[i] ?? 0;
		const parent = prevRoom[room] ?? 0;
		size[parent] = (size[parent] ?? 0) + (size[room] ?? 0);
	}
	const power = (base: bigint, exponent: bigint) => {
		let [result, square, rest] = [1n, base % MOD, exponent];
		for (; rest > 0n; rest >>= 1n) {
			if (rest & 1n) result = (result * square) % MOD;
			square = (square * square) % MOD;
		}
		return result;
	};
	let [numerator, denominator] = [1n, 1n];
	for (let i = 1; i <= n; i++) numerator = (numerator * BigInt(i)) % MOD;
	for (const s of size) denominator = (denominator * BigInt(s)) % MOD;
	return Number((numerator * power(denominator, MOD - 2n)) % MOD);
};
