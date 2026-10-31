/**
 * 3366. Minimum Array Sum
 *
 * Up to `op1` times, halve an element (rounding up), and up to `op2` times
 * subtract `k` from an element that's at least `k`, using each operation at
 * most once per element. Returns the smallest possible sum.
 *
 * Dynamic programming over the elements and how many of each operation are
 * used. An element gets none, one or both, and with both, try either order
 * since subtracting first may or may not be allowed.
 *
 * @see https://leetcode.com/problems/minimum-array-sum/
 * @difficulty Medium
 * @timeComplexity O(n · op1 · op2)
 * @spaceComplexity O(op1 · op2)
 *
 * @example
 * minimumArraySum([2, 8, 3, 19, 3], 3, 1, 1); // 23
 */
export const minimumArraySum = (
	nums: readonly number[],
	k: number,
	op1: number,
	op2: number,
): number => {
	const width = op2 + 1;
	let best = new Float64Array((op1 + 1) * width).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	const halve = (v: number): number => Math.ceil(v / 2);
	for (const num of nums) {
		const options: [halves: number, subtracts: number, value: number][] = [
			[0, 0, num],
			[1, 0, halve(num)],
		];
		if (num >= k) options.push([0, 1, num - k]);
		const both: number[] = [];
		if (halve(num) >= k) both.push(halve(num) - k);
		if (num >= k) both.push(halve(num - k));
		if (both.length > 0) options.push([1, 1, Math.min(...both)]);
		const next = new Float64Array(best.length).fill(Number.POSITIVE_INFINITY);
		for (let a = 0; a <= op1; a++)
			for (let b = 0; b <= op2; b++) {
				const current = best[a * width + b] ?? Number.POSITIVE_INFINITY;
				if (current === Number.POSITIVE_INFINITY) continue;
				for (const [da, db, value] of options) {
					if (a + da > op1 || b + db > op2) continue;
					const at = (a + da) * width + b + db;
					next[at] = Math.min(next[at] ?? 0, current + value);
				}
			}
		best = next;
	}
	return Math.min(...best);
};
