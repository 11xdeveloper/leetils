/**
 * 1889. Minimum Space Wasted From Packaging
 *
 * All `packages` must go in boxes from one supplier, each package in its
 * own box of at least its size. Returns the least total wasted space,
 * modulo 10^9 + 7, or -1 if no supplier can fit every package.
 *
 * With packages sorted and prefix-summed, a supplier's sorted box sizes
 * each take the packages up to that size (by binary search); waste is
 * box space minus package space.
 *
 * @see https://leetcode.com/problems/minimum-space-wasted-from-packaging/
 * @difficulty Hard
 * @timeComplexity O(n log n + B log B · log n) for B boxes in total
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSpaceWastedFromPackaging([3, 5, 8, 10, 11, 12], [[12], [11, 9], [10, 5, 14]]); // 9
 */
export const minimumSpaceWastedFromPackaging = (
	packages: readonly number[],
	boxes: readonly (readonly number[])[],
): number => {
	const sorted = packages.toSorted((a, b) => a - b);
	const total = sorted.reduce((sum, size) => sum + size, 0);
	const largest = sorted.at(-1) ?? 0;
	const upTo = (size: number) => {
		let [low, high] = [0, sorted.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid] ?? 0) <= size) low = mid + 1;
			else high = mid;
		}
		return low;
	};
	let best = Infinity;
	for (const supplier of boxes) {
		const sizes = supplier.toSorted((a, b) => a - b);
		if ((sizes.at(-1) ?? 0) < largest) continue;
		let [space, packed] = [0, 0];
		for (const size of sizes) {
			const reach = upTo(size);
			space += (reach - packed) * size;
			packed = reach;
			if (packed === sorted.length) break;
		}
		best = Math.min(best, space - total);
	}
	return best === Infinity ? -1 : best % 1_000_000_007;
};
