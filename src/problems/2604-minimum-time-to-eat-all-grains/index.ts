/**
 * 2604. Minimum Time to Eat All Grains
 *
 * Hens and grains sit on a line. Each second a hen may move one step,
 * and it eats any grain it reaches. Returns the fewest seconds for all
 * grains to be eaten.
 *
 * Binary search the time. With both sorted, each hen in turn takes the
 * leftmost uneaten grains: if the first lies to its left, it goes there
 * first or last, whichever leaves it reaching further right.
 *
 * @see https://leetcode.com/problems/minimum-time-to-eat-all-grains/
 * @difficulty Hard
 * @timeComplexity O((n + m) log(n + m) + (n + m) log D), where `D` is the span of positions
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumTimeToEatAllGrains([3, 6, 7], [2, 4, 7, 9]); // 2
 */
export const minimumTimeToEatAllGrains = (
	hens: readonly number[],
	grains: readonly number[],
): number => {
	const sortedHens = hens.toSorted((a, b) => a - b);
	const sortedGrains = grains.toSorted((a, b) => a - b);
	const enough = (time: number): boolean => {
		let next = 0;
		for (const hen of sortedHens) {
			const first = sortedGrains[next];
			if (first === undefined) return true;
			let reach = hen + time;
			if (first < hen) {
				const back = hen - first;
				if (back > time) return false;
				reach = Math.max(
					hen + time - 2 * back,
					hen + Math.floor((time - back) / 2),
				);
			}
			while (next < sortedGrains.length && (sortedGrains[next] ?? 0) <= reach)
				next++;
		}
		return next === sortedGrains.length;
	};
	let low = 0;
	let high = 2 * (Math.max(...hens, ...grains) - Math.min(...hens, ...grains));
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (enough(mid)) high = mid;
		else low = mid + 1;
	}
	return low;
};
