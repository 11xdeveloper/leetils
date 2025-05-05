export const findMedianSortedArrays = (
	nums1: number[],
	nums2: number[],
): number => {
	const sorted = nums1.concat(nums2).sort((x, y) => y - x);

	const middle = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0
		? sorted.slice(middle - 1, middle + 1).reduce((x, y) => x + y, 0) / 2
		: sorted[middle]!;
};
