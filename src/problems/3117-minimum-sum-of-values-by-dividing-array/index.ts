/**
 * 3117. Minimum Sum of Values by Dividing Array
 *
 * Split `nums` into `andValues.length` contiguous parts where the i-th part
 * ANDs to `andValues[i]`. A part's value is its last element. Returns the
 * smallest total value, or -1 if no split works.
 *
 * Sweep left to right, keeping for each (parts finished, AND of the open
 * part) the cheapest cost. ANDs only lose bits, so an open part that loses
 * a bit its target needs is dropped, and there are only a few distinct
 * ANDs at a time.
 *
 * @see https://leetcode.com/problems/minimum-sum-of-values-by-dividing-array/
 * @difficulty Hard
 * @timeComplexity O(n · m · log max)
 * @spaceComplexity O(m · log max)
 *
 * @example
 * minimumSumOfValuesByDividingArray([1, 4, 3, 3, 2], [0, 3, 3, 2]); // 12
 */
export const minimumSumOfValuesByDividingArray = (
	nums: readonly number[],
	andValues: readonly number[],
): number => {
	const m = andValues.length;
	const ALL = -1;
	// states[j]: open part's AND (ALL when none is open) → cheapest cost.
	let states: Map<number, number>[] = Array.from(
		{ length: m + 1 },
		() => new Map(),
	);
	states[0]?.set(ALL, 0);
	for (const num of nums) {
		const next: Map<number, number>[] = Array.from(
			{ length: m + 1 },
			() => new Map(),
		);
		const keep = (j: number, and: number, cost: number): void => {
			const map = next[j];
			if (map && cost < (map.get(and) ?? Number.POSITIVE_INFINITY))
				map.set(and, cost);
		};
		for (let j = 0; j < m; j++) {
			const target = andValues[j] ?? 0;
			for (const [and, cost] of states[j] ?? []) {
				const merged = and & num;
				if ((merged & target) !== target) continue;
				keep(j, merged, cost);
				if (merged === target) keep(j + 1, ALL, cost + num);
			}
		}
		states = next;
	}
	return states[m]?.get(ALL) ?? -1;
};
