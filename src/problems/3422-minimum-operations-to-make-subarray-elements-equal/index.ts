/**
 * 3422. Minimum Operations to Make Subarray Elements Equal
 *
 * The fewest ±1 steps to make some subarray of length `k` all equal.
 *
 * Move a window along, keeping Fenwick trees of counts and sums over the
 * sorted values. Each window's cheapest target is its median, found by
 * descending the count tree, and the cost is the distance of everything to
 * it, from the counts and sums below and above.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-subarray-elements-equal/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeSubarrayElementsEqual([4, -3, 2, 1, -4, 6], 3); // 5
 */
export const minimumOperationsToMakeSubarrayElementsEqual = (
	nums: readonly number[],
	k: number,
): number => {
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((v, i) => [v, i + 1]));
	const size = values.length;
	const counts = new Float64Array(size + 1);
	const sums = new Float64Array(size + 1);
	const update = (value: number, sign: number): void => {
		for (let i = rank.get(value) ?? 0; i <= size; i += i & -i) {
			counts[i] = (counts[i] ?? 0) + sign;
			sums[i] = (sums[i] ?? 0) + sign * value;
		}
	};
	let top = 1;
	while (top * 2 <= size) top *= 2;
	/** The m-th smallest value, with the count and sum of the values before it. */
	const kth = (m: number): [value: number, before: number, sum: number] => {
		let position = 0;
		let before = 0;
		let sum = 0;
		for (let step = top; step > 0; step >>= 1) {
			const next = position + step;
			if (next <= size && before + (counts[next] ?? 0) < m) {
				position = next;
				before += counts[next] ?? 0;
				sum += sums[next] ?? 0;
			}
		}
		return [values[position] ?? 0, before, sum];
	};
	let windowSum = 0;
	let best = Number.POSITIVE_INFINITY;
	nums.forEach((num, i) => {
		update(num, 1);
		windowSum += num;
		if (i >= k) {
			update(nums[i - k] ?? 0, -1);
			windowSum -= nums[i - k] ?? 0;
		}
		if (i < k - 1) return;
		const [median, below, belowSum] = kth(Math.ceil(k / 2));
		const cost =
			median * below - belowSum + (windowSum - belowSum) - median * (k - below);
		best = Math.min(best, cost);
	});
	return best;
};
