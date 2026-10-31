/**
 * 2959. Number of Possible Sets of Closing Branches
 *
 * Closing some of `n` branches, the rest must all be within `maxDistance`
 * of each other using only roads between open branches. Returns how many
 * sets of branches can be closed, including none and all.
 *
 * With at most 10 branches, try every set of open branches and run
 * Floyd–Warshall on it.
 *
 * @see https://leetcode.com/problems/number-of-possible-sets-of-closing-branches/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · n³ + 2ⁿ · roads)
 * @spaceComplexity O(n²)
 *
 * @example
 * numberOfPossibleSetsOfClosingBranches(3, 5, [[0, 1, 2], [1, 2, 10], [0, 2, 10]]); // 5
 */
export const numberOfPossibleSetsOfClosingBranches = (
	n: number,
	maxDistance: number,
	roads: readonly (readonly number[])[],
): number => {
	let sets = 0;
	for (let open = 0; open < 1 << n; open++) {
		const distance = Array.from({ length: n }, (_, i) =>
			Array.from({ length: n }, (_, j) =>
				i === j ? 0 : Number.POSITIVE_INFINITY,
			),
		);
		for (const [a = 0, b = 0, w = 0] of roads)
			if ((open >> a) & 1 && (open >> b) & 1) {
				const shorter = Math.min(distance[a]?.[b] ?? 0, w);
				(distance[a] ?? [])[b] = shorter;
				(distance[b] ?? [])[a] = shorter;
			}
		for (let k = 0; k < n; k++) {
			if (!((open >> k) & 1)) continue;
			for (let i = 0; i < n; i++)
				for (let j = 0; j < n; j++) {
					const through = (distance[i]?.[k] ?? 0) + (distance[k]?.[j] ?? 0);
					if (through < (distance[i]?.[j] ?? 0))
						(distance[i] ?? [])[j] = through;
				}
		}
		let ok = true;
		for (let i = 0; i < n && ok; i++)
			for (let j = 0; j < n && ok; j++)
				if (
					(open >> i) & 1 &&
					(open >> j) & 1 &&
					(distance[i]?.[j] ?? 0) > maxDistance
				)
					ok = false;
		if (ok) sets++;
	}
	return sets;
};
