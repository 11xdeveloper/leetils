/** The interface LeetCode provides for reading the mountain array. */
interface MountainArray {
	get(index: number): number;
	length(): number;
}

/**
 * 1095. Find in Mountain Array
 *
 * A mountain array strictly rises then strictly falls, and can only be read
 * through `mountainArr.get(i)` (at most 100 calls). Returns the smallest
 * index holding `target`, or -1.
 *
 * Three binary searches: one for the peak, then one on the rising side and,
 * if needed, one on the falling side, each in its own direction.
 *
 * @see https://leetcode.com/problems/find-in-mountain-array/
 * @difficulty Hard
 * @timeComplexity O(log n) calls to get
 * @spaceComplexity O(1)
 *
 * @example
 * findInMountainArray(3, { get: (i) => [1, 2, 3, 4, 5, 3, 1][i] ?? 0, length: () => 7 }); // 2
 */
export const findInMountainArray = (
	target: number,
	mountainArr: MountainArray,
): number => {
	const n = mountainArr.length();
	let low = 0;
	let high = n - 1;
	while (low < high) {
		const mid = (low + high) >>> 1;
		if (mountainArr.get(mid) < mountainArr.get(mid + 1)) low = mid + 1;
		else high = mid;
	}
	const peak = low;

	const search = (from: number, to: number, rising: boolean): number => {
		while (from <= to) {
			const mid = (from + to) >>> 1;
			const value = mountainArr.get(mid);
			if (value === target) return mid;
			if (value < target === rising) from = mid + 1;
			else to = mid - 1;
		}
		return -1;
	};

	const left = search(0, peak, true);
	return left !== -1 ? left : search(peak + 1, n - 1, false);
};
