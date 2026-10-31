/**
 * 3923. Minimum Generations to Target Point
 *
 * Each generation adds the floored midpoint of every pair of different
 * points produced so far. Returns the first generation containing
 * `target` (0 if it's given), or -1.
 *
 * Coordinates stay within 0 to 6, so simulate until the target appears
 * or nothing new is produced.
 *
 * @see https://leetcode.com/problems/minimum-generations-to-target-point/
 * @difficulty Medium
 * @timeComplexity O(G · P²), for P ≤ 343 points over G generations
 * @spaceComplexity O(P)
 *
 * @example
 * minimumGenerationsToTargetPoint([[0, 0, 0], [5, 5, 5]], [1, 1, 1]); // 2
 */
export const minimumGenerationsToTargetPoint = (
	points: readonly (readonly number[])[],
	target: readonly number[],
): number => {
	const key = ([x = 0, y = 0, z = 0]: readonly number[]) => x * 49 + y * 7 + z;
	const goal = key(target);
	const have = new Set(points.map(key));
	for (let generation = 0; ; generation++) {
		if (have.has(goal)) return generation;
		const list = [...have];
		const fresh = new Set<number>();
		for (let i = 0; i < list.length; i++)
			for (let j = i + 1; j < list.length; j++) {
				const [a = 0, b = 0] = [list[i], list[j]];
				const mid = (u: number, v: number) => Math.floor((u + v) / 2);
				const c =
					mid(Math.floor(a / 49), Math.floor(b / 49)) * 49 +
					mid(Math.floor(a / 7) % 7, Math.floor(b / 7) % 7) * 7 +
					mid(a % 7, b % 7);
				if (!have.has(c)) fresh.add(c);
			}
		if (fresh.size === 0) return -1;
		for (const c of fresh) have.add(c);
	}
};
