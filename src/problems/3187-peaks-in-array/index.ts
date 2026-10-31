/**
 * 3187. Peaks in Array
 *
 * Process queries on `nums`: `[1, l, r]` counts the peaks (elements bigger
 * than both neighbours) strictly inside `nums[l..r]`, and `[2, index, val]`
 * sets `nums[index] = val`.
 *
 * Keep a Fenwick tree of which positions are peaks. An update can only
 * change the peak status of the position and its two neighbours.
 *
 * @see https://leetcode.com/problems/peaks-in-array/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * peaksInArray([3, 1, 4, 2, 5], [[2, 3, 4], [1, 0, 4]]); // [0]
 */
export const peaksInArray = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const values = [...nums];
	const tree = new Int32Array(n + 1);
	const peak = new Uint8Array(n);
	const add = (i: number, delta: number): void => {
		for (let j = i + 1; j <= n; j += j & -j) tree[j] = (tree[j] ?? 0) + delta;
	};
	const prefix = (i: number): number => {
		let sum = 0;
		for (let j = i; j > 0; j -= j & -j) sum += tree[j] ?? 0;
		return sum;
	};
	const refresh = (i: number): void => {
		if (i <= 0 || i >= n - 1) return;
		const now =
			(values[i] ?? 0) > (values[i - 1] ?? 0) &&
			(values[i] ?? 0) > (values[i + 1] ?? 0)
				? 1
				: 0;
		if (now !== peak[i]) {
			add(i, now - (peak[i] ?? 0));
			peak[i] = now;
		}
	};
	for (let i = 1; i < n - 1; i++) refresh(i);
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0] of queries)
		if (type === 1) answers.push(b - a < 2 ? 0 : prefix(b) - prefix(a + 1));
		else {
			values[a] = b;
			for (const i of [a - 1, a, a + 1]) refresh(i);
		}
	return answers;
};
