/**
 * 3636. Threshold Majority Queries
 *
 * For each query `[l, r, threshold]`, returns the most frequent value in
 * `nums[l..r]` (the smallest on ties) if it appears at least `threshold`
 * times, else -1.
 *
 * Mo's algorithm with rollback, so counts only ever go up and the best
 * value is easy to maintain: group queries by the block their left end is
 * in, extend the right end through each group in order, and add each
 * query's left part temporarily before undoing it. Short queries are
 * counted directly.
 *
 * @see https://leetcode.com/problems/threshold-majority-queries/
 * @difficulty Hard
 * @timeComplexity O((n + q)√n + q log q)
 * @spaceComplexity O(n + q)
 *
 * @example
 * thresholdMajorityQueries([1, 1, 2, 2, 1, 1], [[0, 5, 4], [0, 3, 3], [2, 3, 2]]); // [1, -1, 2]
 */
export const thresholdMajorityQueries = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const block = Math.max(1, Math.ceil(Math.sqrt(n)));
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((value, i) => [value, i]));
	const ids = nums.map((num) => rank.get(num) ?? 0);
	const counts = new Int32Array(values.length);
	let [bestCount, bestId] = [0, 0];
	const add = (i: number): void => {
		const id = ids[i] ?? 0;
		const count = (counts[id] ?? 0) + 1;
		counts[id] = count;
		if (count > bestCount || (count === bestCount && id < bestId))
			[bestCount, bestId] = [count, id];
	};
	const answers = new Array<number>(queries.length).fill(-1);
	const answer = (index: number, threshold: number): void => {
		if (bestCount >= threshold) answers[index] = values[bestId] ?? -1;
	};
	const groups: number[][] = Array.from(
		{ length: Math.ceil(n / block) },
		() => [],
	);
	queries.forEach(([l = 0, r = 0, threshold = 0], index) => {
		if (r - l + 1 <= block) {
			[bestCount, bestId] = [0, 0];
			for (let i = l; i <= r; i++) add(i);
			answer(index, threshold);
			for (let i = l; i <= r; i++) counts[ids[i] ?? 0] = 0;
		} else groups[Math.floor(l / block)]?.push(index);
	});
	groups.forEach((group, b) => {
		group.sort((x, y) => (queries[x]?.[1] ?? 0) - (queries[y]?.[1] ?? 0));
		const end = (b + 1) * block;
		[bestCount, bestId] = [0, 0];
		let right = end - 1;
		for (const index of group) {
			const [l = 0, r = 0, threshold = 0] = queries[index] ?? [];
			while (right < r) add(++right);
			const saved = [bestCount, bestId] as const;
			for (let i = l; i < end; i++) add(i);
			answer(index, threshold);
			for (let i = l; i < end; i++)
				counts[ids[i] ?? 0] = (counts[ids[i] ?? 0] ?? 0) - 1;
			[bestCount, bestId] = saved;
		}
		for (let i = end; i <= right; i++) counts[ids[i] ?? 0] = 0;
	});
	return answers;
};
