/**
 * 4009. Minimum Possible Maximum Waiting Time
 *
 * Cars come up in order, each choosing one of two dispensers with enough
 * fuel and waiting until it's free; the next car may choose once this one
 * starts. Serving as many cars as possible, returns the smallest possible
 * longest wait, or -1 if no car can be served.
 *
 * Search over (car, fuel left in each dispenser, time until each is free,
 * measured from now), keeping the best (cars served, longest wait). The
 * dispenser just used is busy for exactly that car's demand, so few
 * states arise.
 *
 * @see https://leetcode.com/problems/minimum-possible-maximum-waiting-time/
 * @difficulty Hard
 * @timeComplexity O(n · F · D), for fuel F and demands up to D
 * @spaceComplexity O(n · F · D)
 *
 * @example
 * minimumPossibleMaximumWaitingTime([6, 8, 4, 6, 5], [16, 13]); // 6
 */
export const minimumPossibleMaximumWaitingTime = (
	demand: readonly number[],
	fuel: readonly number[],
): number => {
	const n = demand.length;
	const memo = new Map<string, [served: number, wait: number]>();
	const go = (
		i: number,
		fuel0: number,
		fuel1: number,
		busy0: number,
		busy1: number,
	): [number, number] => {
		if (i === n) return [0, 0];
		const key = `${i},${fuel0},${fuel1},${busy0},${busy1}`;
		const cached = memo.get(key);
		if (cached) return cached;
		const need = demand[i] ?? 0;
		let best: [number, number] = [0, 0];
		const consider = (served: number, wait: number) => {
			if (served > best[0] || (served === best[0] && wait < best[1]))
				best = [served, wait];
		};
		if (fuel0 >= need) {
			const [served, wait] = go(
				i + 1,
				fuel0 - need,
				fuel1,
				need,
				Math.max(0, busy1 - busy0),
			);
			consider(served + 1, Math.max(wait, busy0));
		}
		if (fuel1 >= need) {
			const [served, wait] = go(
				i + 1,
				fuel0,
				fuel1 - need,
				Math.max(0, busy0 - busy1),
				need,
			);
			consider(served + 1, Math.max(wait, busy1));
		}
		memo.set(key, best);
		return best;
	};
	const [served, wait] = go(0, fuel[0] ?? 0, fuel[1] ?? 0, 0, 0);
	return served === 0 ? -1 : wait;
};
