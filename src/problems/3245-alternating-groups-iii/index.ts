/** A Fenwick tree of counts with order statistics. */
const fenwick = (n: number) => {
	const tree = new Float64Array(n + 1);
	let top = 1;
	while (top * 2 <= n) top *= 2;
	return {
		add(i: number, delta: number): void {
			for (let j = i + 1; j <= n; j += j & -j) tree[j] = (tree[j] ?? 0) + delta;
		},
		/** Sum over positions below `i`. */
		below(i: number): number {
			let sum = 0;
			for (let j = i; j > 0; j -= j & -j) sum += tree[j] ?? 0;
			return sum;
		},
		/** The position holding the k-th unit (from 1). */
		kth(k: number): number {
			let position = 0;
			let left = k;
			for (let step = top; step > 0; step >>= 1)
				if (position + step <= n && (tree[position + step] ?? 0) < left) {
					position += step;
					left -= tree[position] ?? 0;
				}
			return position;
		},
	};
};

/**
 * 3245. Alternating Groups III
 *
 * Tiles in a circle are red (0) or blue (1). Queries either count the
 * alternating groups (runs of consecutive tiles with alternating colors) of
 * a given size, or recolor a tile.
 *
 * Mark the "breaks" where a tile matches the next one; the maximal
 * alternating runs lie between consecutive breaks, and a run of L tiles
 * holds L - s + 1 groups of size s. Keep the breaks in a Fenwick tree to
 * find neighbouring breaks, and the run lengths in Fenwick trees of counts
 * and sums so a query adds up the runs of length at least s. Recoloring
 * only changes the breaks on either side of the tile.
 *
 * @see https://leetcode.com/problems/alternating-groups-iii/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * alternatingGroupsIII([0, 1, 1, 0, 1], [[2, 1, 0], [1, 4]]); // [2]
 */
export const alternatingGroupsIII = (
	colors: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = colors.length;
	const color = [...colors];
	const breaks = fenwick(n);
	const isBreak = new Uint8Array(n);
	let breakCount = 0;
	const runCounts = fenwick(n + 1);
	const runSums = fenwick(n + 1);
	const addRun = (length: number, sign: number): void => {
		runCounts.add(length, sign);
		runSums.add(length, sign * length);
	};
	const distance = (from: number, to: number): number =>
		from === to ? n : (to - from + n) % n;
	const before = (b: number): number => {
		const count = breaks.below(b);
		return breaks.kth(count > 0 ? count : breakCount);
	};
	const after = (b: number): number => {
		const count = breaks.below(b + 1);
		return breaks.kth(count < breakCount ? count + 1 : 1);
	};
	const insert = (b: number): void => {
		if (breakCount === 0) addRun(n, 1);
		else {
			const p = before(b);
			const s = after(b);
			addRun(distance(p, s), -1);
			addRun(distance(p, b), 1);
			addRun(distance(b, s), 1);
		}
		breaks.add(b, 1);
		isBreak[b] = 1;
		breakCount++;
	};
	const remove = (b: number): void => {
		breaks.add(b, -1);
		isBreak[b] = 0;
		breakCount--;
		if (breakCount === 0) addRun(n, -1);
		else {
			const p = before(b);
			const s = after(b);
			addRun(distance(p, b), -1);
			addRun(distance(b, s), -1);
			addRun(distance(p, s), 1);
		}
	};
	const matchesNext = (i: number): boolean => color[i] === color[(i + 1) % n];
	for (let i = 0; i < n; i++) if (matchesNext(i)) insert(i);
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0] of queries) {
		if (type === 1) {
			if (breakCount === 0) answers.push(n);
			else {
				const count = runCounts.below(n + 1) - runCounts.below(a);
				const sum = runSums.below(n + 1) - runSums.below(a);
				answers.push(sum - (a - 1) * count);
			}
			continue;
		}
		if (color[a] === b) continue;
		const sides = [(a + n - 1) % n, a];
		for (const side of sides) if (isBreak[side]) remove(side);
		color[a] = b;
		for (const side of sides) if (matchesNext(side)) insert(side);
	}
	return answers;
};
