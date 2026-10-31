/**
 * 3072. Distribute Elements Into Two Arrays II
 *
 * Put `nums[0]` in one array and `nums[1]` in another, then add each later
 * element to the array with more elements greater than it, or on a tie to
 * the shorter array, or on another tie to the first. Returns the two arrays
 * joined.
 *
 * Simulate, counting the elements greater than a value with a Fenwick tree
 * per array over the values' ranks.
 *
 * @see https://leetcode.com/problems/distribute-elements-into-two-arrays-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * distributeElementsIntoTwoArraysII([2, 1, 3, 3]); // [2, 3, 1, 3]
 */
export const distributeElementsIntoTwoArraysII = (
	nums: readonly number[],
): number[] => {
	const values = [...new Set(nums)].sort((a, b) => a - b);
	const rank = new Map(values.map((value, i) => [value, i + 1]));
	const size = values.length;
	const makeTree = () => {
		const tree = new Int32Array(size + 1);
		let count = 0;
		return {
			add(value: number): void {
				count++;
				for (let i = rank.get(value) ?? 0; i <= size; i += i & -i)
					tree[i] = (tree[i] ?? 0) + 1;
			},
			greater(value: number): number {
				let atMost = 0;
				for (let i = rank.get(value) ?? 0; i > 0; i -= i & -i)
					atMost += tree[i] ?? 0;
				return count - atMost;
			},
		};
	};
	const arrays: number[][] = [[], []];
	const trees = [makeTree(), makeTree()];
	nums.forEach((num, i) => {
		let target = i === 1 ? 1 : 0;
		if (i >= 2) {
			const g0 = trees[0]?.greater(num) ?? 0;
			const g1 = trees[1]?.greater(num) ?? 0;
			const len0 = arrays[0]?.length ?? 0;
			const len1 = arrays[1]?.length ?? 0;
			target = g0 !== g1 ? (g0 > g1 ? 0 : 1) : len1 < len0 ? 1 : 0;
		}
		arrays[target]?.push(num);
		trees[target]?.add(num);
	});
	return arrays.flat();
};
