/**
 * 2977. Minimum Cost to Convert String II
 *
 * Changing substring `original[i]` into `changed[i]` costs `cost[i]`, and
 * changes can be chained. Operations on `source` must touch disjoint
 * ranges or exactly the same range. Returns the cheapest way to turn
 * `source` into `target`, or -1.
 *
 * Floyd–Warshall over the distinct strings of each length gives the
 * cheapest chain between any two. Then DP over prefixes: a position
 * already matching is free, or the prefix can end with a converted piece
 * of any of those lengths.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-convert-string-ii/
 * @difficulty Hard
 * @timeComplexity O(m³ + n · L · ℓ), for `m` strings, `L` lengths and longest `ℓ`
 * @spaceComplexity O(m² + n)
 *
 * @example
 * minimumCostToConvertStringII("abcdefgh", "acdeeghh", ["bcd", "fgh", "thh"], ["cde", "thh", "ghh"], [1, 3, 5]); // 9
 */
export const minimumCostToConvertStringII = (
	source: string,
	target: string,
	original: readonly string[],
	changed: readonly string[],
	cost: readonly number[],
): number => {
	const ids = new Map<string, number>();
	const idOf = (s: string): number => {
		const existing = ids.get(s);
		if (existing !== undefined) return existing;
		ids.set(s, ids.size);
		return ids.size - 1;
	};
	for (const [i, from] of original.entries()) {
		idOf(from);
		idOf(changed[i] ?? "");
	}
	const m = ids.size;
	const distance = Array.from({ length: m }, (_, i) =>
		Array.from({ length: m }, (_, j) =>
			i === j ? 0 : Number.POSITIVE_INFINITY,
		),
	);
	for (const [i, from] of original.entries()) {
		const a = idOf(from);
		const b = idOf(changed[i] ?? "");
		(distance[a] ?? [])[b] = Math.min(distance[a]?.[b] ?? 0, cost[i] ?? 0);
	}
	for (let k = 0; k < m; k++)
		for (let i = 0; i < m; i++) {
			const viaK = distance[i]?.[k] ?? Number.POSITIVE_INFINITY;
			if (viaK === Number.POSITIVE_INFINITY) continue;
			for (let j = 0; j < m; j++) {
				const through = viaK + (distance[k]?.[j] ?? 0);
				if (through < (distance[i]?.[j] ?? 0)) (distance[i] ?? [])[j] = through;
			}
		}

	const lengths = [...new Set(original.map((s) => s.length))];
	const n = source.length;
	const best = Array.from({ length: n + 1 }, (_, i) =>
		i === 0 ? 0 : Number.POSITIVE_INFINITY,
	);
	for (let end = 1; end <= n; end++) {
		let value =
			source.charAt(end - 1) === target.charAt(end - 1)
				? (best[end - 1] ?? 0)
				: Number.POSITIVE_INFINITY;
		for (const length of lengths) {
			if (length > end) continue;
			const before = best[end - length] ?? Number.POSITIVE_INFINITY;
			if (before === Number.POSITIVE_INFINITY) continue;
			const from = ids.get(source.slice(end - length, end));
			const to = ids.get(target.slice(end - length, end));
			if (from === undefined || to === undefined) continue;
			value = Math.min(
				value,
				before + (distance[from]?.[to] ?? Number.POSITIVE_INFINITY),
			);
		}
		best[end] = value;
	}
	const answer = best[n] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
