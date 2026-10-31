/**
 * 4054. Count Shadow Pairs I
 *
 * Counts pairs i < j with `nums[i] < nums[j]` and no smaller element than
 * `nums[i]` between them.
 *
 * For each i, valid j lie before the next strictly smaller element (a
 * monotonic stack finds it); everything there is at least `nums[i]`, so
 * count them minus the copies of `nums[i]`, found by binary search in the
 * value's positions.
 *
 * @see https://leetcode.com/problems/count-shadow-pairs-i/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countShadowPairsI([6, 7, 6, 6, 7]); // 4
 */
export const countShadowPairsI = (nums: readonly number[]): number => {
	const n = nums.length;
	const nextSmaller = new Int32Array(n).fill(n);
	const stack: number[] = [];
	nums.forEach((x, i) => {
		while (stack.length > 0 && (nums[stack.at(-1) ?? 0] ?? 0) > x)
			nextSmaller[stack.pop() ?? 0] = i;
		stack.push(i);
	});
	const positions = new Map<number, number[]>();
	nums.forEach((x, i) => {
		const list = positions.get(x) ?? [];
		list.push(i);
		positions.set(x, list);
	});
	const before = (list: number[], limit: number): number => {
		let [lo, hi] = [0, list.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((list[mid] ?? 0) < limit) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	};
	let count = 0;
	nums.forEach((x, i) => {
		const end = nextSmaller[i] ?? n;
		const list = positions.get(x) ?? [];
		const equal = before(list, end) - before(list, i + 1);
		count += end - i - 1 - equal;
	});
	return count;
};
