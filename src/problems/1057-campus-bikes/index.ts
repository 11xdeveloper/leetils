/**
 * 1057. Campus Bikes
 *
 * Repeatedly assigns the closest free (worker, bike) pair by Manhattan
 * distance, breaking ties by smaller worker index and then smaller bike
 * index. Returns the bike index assigned to each worker.
 *
 * Distances are at most 2000, so it buckets every pair by distance, filling
 * each bucket in worker-then-bike order. Going through the buckets in order
 * reproduces the assignment rule without sorting.
 *
 * @see https://leetcode.com/problems/campus-bikes/
 * @difficulty Medium
 * @timeComplexity O(n · m + 2000)
 * @spaceComplexity O(n · m)
 *
 * @example
 * campusBikes([[0, 0], [2, 1]], [[1, 2], [3, 3]]); // [1, 0]
 */
export const campusBikes = (
	workers: readonly (readonly number[])[],
	bikes: readonly (readonly number[])[],
): number[] => {
	const buckets: [worker: number, bike: number][][] = Array.from(
		{ length: 2001 },
		() => [],
	);
	for (const [w, [wx = 0, wy = 0]] of workers.entries()) {
		for (const [b, [bx = 0, by = 0]] of bikes.entries())
			buckets[Math.abs(wx - bx) + Math.abs(wy - by)]?.push([w, b]);
	}

	const assigned = new Array<number>(workers.length).fill(-1);
	const taken = new Uint8Array(bikes.length);
	let remaining = workers.length;
	for (const bucket of buckets) {
		for (const [w, b] of bucket) {
			if (assigned[w] !== -1 || taken[b]) continue;
			assigned[w] = b;
			taken[b] = 1;
			if (--remaining === 0) return assigned;
		}
	}
	return assigned;
};
