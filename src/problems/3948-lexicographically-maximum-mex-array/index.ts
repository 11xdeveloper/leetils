/**
 * 3948. Lexicographically Maximum MEX Array
 *
 * Repeatedly cut a non-empty prefix off `nums` and record its MEX.
 * Returns the lexicographically largest list of MEXes.
 *
 * The first value can be at most the MEX of everything left. Reach it
 * with the shortest prefix, which leaves the most for later (a longer
 * remainder never has a smaller MEX, and a longer result wins ties).
 * MEXes of suffixes come from one sweep from the right.
 *
 * @see https://leetcode.com/problems/lexicographically-maximum-mex-array/
 * @difficulty Hard
 * @timeComplexity O(n + V)
 * @spaceComplexity O(n + V)
 *
 * @example
 * lexicographicallyMaximumMexArray([0, 1, 0]); // [2, 1]
 */
export const lexicographicallyMaximumMexArray = (
	nums: readonly number[],
): number[] => {
	const n = nums.length;
	const present = new Uint8Array(n + 2);
	const suffixMex = new Int32Array(n + 1);
	let mex = 0;
	for (let i = n - 1; i >= 0; i--) {
		const x = nums[i] ?? 0;
		if (x <= n) present[x] = 1;
		while (present[mex]) mex++;
		suffixMex[i] = mex;
	}
	const seenAt = new Int32Array(n + 2).fill(-1);
	const result: number[] = [];
	for (let i = 0; i < n; ) {
		const target = suffixMex[i] ?? 0;
		let missing = target;
		let j = i;
		if (target === 0) j = i + 1;
		while (missing > 0) {
			const x = nums[j++] ?? 0;
			if (x < target && seenAt[x] !== i) {
				seenAt[x] = i;
				missing--;
			}
		}
		result.push(target);
		i = j;
	}
	return result;
};
