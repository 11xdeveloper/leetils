/**
 * 2976. Minimum Cost to Convert String I
 *
 * Changing letter `original[i]` into `changed[i]` costs `cost[i]`, and
 * changes can be chained. Returns the cheapest way to turn `source` into
 * `target`, or -1.
 *
 * Floyd–Warshall over the 26 letters, then add up each position.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-convert-string-i/
 * @difficulty Medium
 * @timeComplexity O(26³ + n + r)
 * @spaceComplexity O(26²)
 *
 * @example
 * minimumCostToConvertStringI("aaaa", "bbbb", ["a", "c"], ["c", "b"], [1, 2]); // 12
 */
export const minimumCostToConvertStringI = (
	source: string,
	target: string,
	original: readonly string[],
	changed: readonly string[],
	cost: readonly number[],
): number => {
	const distance = Array.from({ length: 26 }, (_, i) =>
		Array.from({ length: 26 }, (_, j) =>
			i === j ? 0 : Number.POSITIVE_INFINITY,
		),
	);
	for (const [i, from] of original.entries()) {
		const a = from.charCodeAt(0) - 97;
		const b = (changed[i] ?? "a").charCodeAt(0) - 97;
		(distance[a] ?? [])[b] = Math.min(distance[a]?.[b] ?? 0, cost[i] ?? 0);
	}
	for (let k = 0; k < 26; k++)
		for (let i = 0; i < 26; i++)
			for (let j = 0; j < 26; j++) {
				const through = (distance[i]?.[k] ?? 0) + (distance[k]?.[j] ?? 0);
				if (through < (distance[i]?.[j] ?? 0)) (distance[i] ?? [])[j] = through;
			}
	let total = 0;
	for (let i = 0; i < source.length; i++)
		total +=
			distance[source.charCodeAt(i) - 97]?.[target.charCodeAt(i) - 97] ?? 0;
	return total === Number.POSITIVE_INFINITY ? -1 : total;
};
