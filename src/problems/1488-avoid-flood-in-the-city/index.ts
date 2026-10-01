/**
 * 1488. Avoid Flood in The City
 *
 * `rains[i]` is the lake it rains on that day, or 0 for a dry day when one
 * lake may be emptied. A lake that's rained on while full floods. Returns a
 * plan (-1 on rainy days, the lake to empty on dry days) avoiding floods,
 * or `[]` if there's none.
 *
 * When it rains on a lake that's already full, empty it on the first unused
 * dry day since it last filled. Choosing the earliest leaves later dry days
 * free for everything else. A union–find over days skips used dry days.
 *
 * @see https://leetcode.com/problems/avoid-flood-in-the-city/
 * @difficulty Medium
 * @timeComplexity O(n α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * avoidFloodInTheCity([1, 2, 0, 0, 2, 1]); // [-1, -1, 2, 1, -1, -1]
 */
export const avoidFloodInTheCity = (rains: readonly number[]): number[] => {
	const n = rains.length;
	// next[i] leads to the first unused dry day at or after i (n if none).
	const next = Array.from({ length: n + 1 }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (next[root] !== root) root = next[root] ?? n;
		for (let at = x; next[at] !== root; ) {
			const up = next[at] ?? n;
			next[at] = root;
			at = up;
		}
		return root;
	};
	rains.forEach((lake, day) => {
		if (lake !== 0) next[day] = day + 1;
	});
	const plan = rains.map((lake): number => (lake === 0 ? 1 : -1));
	const filled = new Map<number, number>();
	for (let day = 0; day < n; day++) {
		const lake = rains[day] ?? 0;
		if (lake === 0) continue;
		const previous = filled.get(lake);
		if (previous !== undefined) {
			const dry = find(previous);
			if (dry >= day) return [];
			plan[dry] = lake;
			next[dry] = dry + 1;
		}
		filled.set(lake, day);
	}
	return plan;
};
