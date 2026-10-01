/**
 * 1562. Find Latest Group of Size M
 *
 * Bits of a zero string are set in the order `arr`. Returns the last step
 * at which some maximal run of 1s has length exactly `m`, or -1.
 *
 * Each run's length is stored at both its ends. Setting a bit merges it
 * with the runs either side; a counter of runs of length `m` is updated as
 * runs are absorbed and created.
 *
 * @see https://leetcode.com/problems/find-latest-group-of-size-m/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findLatestGroupOfSizeM([3, 5, 1, 2, 4], 1); // 4
 */
export const findLatestGroupOfSizeM = (
	arr: readonly number[],
	m: number,
): number => {
	const n = arr.length;
	const length = new Array<number>(n + 2).fill(0);
	let [runsOfM, latest] = [0, -1];
	arr.forEach((position, step) => {
		const [left, right] = [
			length[position - 1] ?? 0,
			length[position + 1] ?? 0,
		];
		if (left === m) runsOfM--;
		if (right === m) runsOfM--;
		const total = left + right + 1;
		length[position - left] = total;
		length[position + right] = total;
		if (total === m) runsOfM++;
		if (runsOfM > 0) latest = step + 1;
	});
	return latest;
};
