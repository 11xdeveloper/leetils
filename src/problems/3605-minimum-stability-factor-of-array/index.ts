/**
 * 3605. Minimum Stability Factor of Array
 *
 * A subarray is stable if its gcd is at least 2. Change at most `maxC`
 * elements of `nums` to any integers, minimising the length of the
 * longest stable subarray. Returns that length.
 *
 * Binary search the length L. To test it, sweep from the left: whenever
 * the longest stable subarray ending here, after the last change, is
 * longer than L, change this element (to 1), which breaks it and as many
 * later ones as possible. The longest stable
 * subarray ending at each index comes from the running list of distinct
 * gcds of subarrays ending there.
 *
 * @see https://leetcode.com/problems/minimum-stability-factor-of-array/
 * @difficulty Hard
 * @timeComplexity O(n log V + n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumStabilityFactorOfArray([3, 5, 10], 1); // 1
 */
export const minimumStabilityFactorOfArray = (
	nums: readonly number[],
	maxC: number,
): number => {
	const n = nums.length;
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	// earliest[i]: the first start of a stable subarray ending at i, or i + 1.
	const earliest = new Int32Array(n);
	let runs: [g: number, start: number][] = [];
	nums.forEach((num, i) => {
		const next: [number, number][] = [];
		for (const [g, start] of [...runs, [num, i] as [number, number]]) {
			const value = gcd(g, num);
			if (next.at(-1)?.[0] === value) continue;
			next.push([value, start]);
		}
		runs = next;
		earliest[i] = runs.find(([g]) => g >= 2)?.[1] ?? i + 1;
	});
	const changesFor = (limit: number): number => {
		let changes = 0;
		let lastChange = -1;
		for (let i = 0; i < n; i++) {
			const start = Math.max(earliest[i] ?? 0, lastChange + 1);
			if (i - start + 1 > limit) {
				changes++;
				lastChange = i;
			}
		}
		return changes;
	};
	let [lo, hi] = [0, n];
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (changesFor(mid) <= maxC) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
