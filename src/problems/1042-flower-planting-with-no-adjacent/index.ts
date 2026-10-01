/**
 * 1042. Flower Planting With No Adjacent
 *
 * Gardens 1 to `n` are joined by `paths`, each garden with at most three
 * neighbours. Returns a flower type (1–4) for each garden so that no path
 * joins two gardens of the same type. Any such answer is accepted.
 *
 * Greedy: with at most three neighbours, one of the four types is always
 * free, so each garden takes the smallest type its neighbours haven't.
 *
 * @see https://leetcode.com/problems/flower-planting-with-no-adjacent/
 * @difficulty Medium
 * @timeComplexity O(n + paths)
 * @spaceComplexity O(n + paths)
 *
 * @example
 * flowerPlantingWithNoAdjacent(3, [[1, 2], [2, 3], [3, 1]]); // [1, 2, 3]
 */
export const flowerPlantingWithNoAdjacent = (
	n: number,
	paths: readonly (readonly number[])[],
): number[] => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 1, b = 1] of paths) {
		neighbours[a - 1]?.push(b - 1);
		neighbours[b - 1]?.push(a - 1);
	}
	const types = new Array<number>(n).fill(0);
	for (let garden = 0; garden < n; garden++) {
		const taken = new Set(
			(neighbours[garden] ?? []).map((other) => types[other]),
		);
		types[garden] = [1, 2, 3, 4].find((type) => !taken.has(type)) ?? 1;
	}
	return types;
};
