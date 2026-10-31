/**
 * 2594. Minimum Time to Repair Cars
 *
 * A mechanic of rank `r` repairs `c` cars in `r · c²` minutes, and all
 * work at once. Returns the fewest minutes to repair `cars` cars.
 *
 * Binary search the time `t`: each mechanic manages `⌊√(t / r)⌋` cars.
 *
 * @see https://leetcode.com/problems/minimum-time-to-repair-cars/
 * @difficulty Medium
 * @timeComplexity O(n log(r · cars²))
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeToRepairCars([4, 2, 3, 1], 10); // 16
 */
export const minimumTimeToRepairCars = (
	ranks: readonly number[],
	cars: number,
): number => {
	const repaired = (time: number): number => {
		let total = 0;
		for (const rank of ranks) {
			let c = Math.floor(Math.sqrt(time / rank));
			while (rank * (c + 1) * (c + 1) <= time) c++;
			while (c > 0 && rank * c * c > time) c--;
			total += c;
		}
		return total;
	};
	let low = 1;
	let high = Math.min(...ranks) * cars * cars;
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (repaired(mid) >= cars) high = mid;
		else low = mid + 1;
	}
	return low;
};
