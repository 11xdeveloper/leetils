/**
 * 1066. Campus Bikes II
 *
 * Assigns each worker a different bike to minimise the total Manhattan
 * distance, and returns that total.
 *
 * DP over the set of bikes used, as a bitmask: workers are assigned in
 * order, so the number of bikes used tells whose turn it is.
 *
 * @see https://leetcode.com/problems/campus-bikes-ii/
 * @difficulty Medium
 * @timeComplexity O(2^m · m) for m bikes
 * @spaceComplexity O(2^m)
 *
 * @example
 * campusBikesII([[0, 0], [2, 1]], [[1, 2], [3, 3]]); // 6
 */
export const campusBikesII = (
	workers: readonly (readonly number[])[],
	bikes: readonly (readonly number[])[],
): number => {
	const m = bikes.length;
	const best = new Array<number>(1 << m).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	let answer = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << m; mask++) {
		const cost = best[mask] ?? Number.POSITIVE_INFINITY;
		if (cost === Number.POSITIVE_INFINITY) continue;
		let worker = 0;
		for (let bits = mask; bits; bits &= bits - 1) worker++;
		if (worker === workers.length) {
			answer = Math.min(answer, cost);
			continue;
		}
		const [wx = 0, wy = 0] = workers[worker] ?? [];
		for (let bike = 0; bike < m; bike++) {
			if (mask & (1 << bike)) continue;
			const [bx = 0, by = 0] = bikes[bike] ?? [];
			const next = mask | (1 << bike);
			best[next] = Math.min(
				best[next] ?? Number.POSITIVE_INFINITY,
				cost + Math.abs(wx - bx) + Math.abs(wy - by),
			);
		}
	}
	return answer;
};
