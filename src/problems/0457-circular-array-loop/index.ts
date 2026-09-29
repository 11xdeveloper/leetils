/**
 * 457. Circular Array Loop
 *
 * From index `i`, `nums[i]` says how far to move forwards (positive) or
 * backwards (negative), wrapping around the array. Returns whether there's
 * a cycle longer than one element whose moves all go the same way.
 *
 * Walks from each unvisited index, marking indices with the walk's number,
 * and stops on a move in the other direction or a move to itself. Reaching
 * an index marked by the same walk means it has gone round a valid cycle;
 * reaching one from an earlier walk means everything ahead was already
 * checked. Each index is visited once overall.
 *
 * @see https://leetcode.com/problems/circular-array-loop/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * circularArrayLoop([2, -1, 1, 2, 2]); // true: 0 → 2 → 3 → 0
 */
export const circularArrayLoop = (nums: readonly number[]): boolean => {
	const n = nums.length;
	const next = (i: number): number => (((i + (nums[i] ?? 0)) % n) + n) % n;
	const walk = new Array<number>(n).fill(0);

	for (let start = 0; start < n; start++) {
		if (walk[start] !== 0) continue;
		const forwards = (nums[start] ?? 0) > 0;

		for (let i = start; ; ) {
			if (walk[i] !== 0) {
				if (walk[i] === start + 1) return true;
				break;
			}
			if ((nums[i] ?? 0) > 0 !== forwards) break;
			walk[i] = start + 1;
			const j = next(i);
			if (j === i) break;
			i = j;
		}
	}

	return false;
};
