/**
 * 818. Race Car
 *
 * A car starts at 0 with speed 1. `A` moves it by its speed and doubles the
 * speed; `R` reverses direction, setting the speed to -1 or 1. Returns the
 * length of the shortest instruction sequence that ends at `target`.
 *
 * DP over targets. With `n` the bit length of `t`, `n` accelerations reach
 * `2^n - 1`: exactly `t`, or just past it, after which the car reverses and
 * solves the rest. Otherwise it stops short at `2^(n-1) - 1`, reverses, backs
 * up `2^m - 1` for some `m`, reverses again and solves the rest forwards.
 *
 * @see https://leetcode.com/problems/race-car/
 * @difficulty Hard
 * @timeComplexity O(target · log target)
 * @spaceComplexity O(target)
 *
 * @example
 * raceCar(6); // 5: "AAARA"
 */
export const raceCar = (target: number): number => {
	const shortest = new Array<number>(target + 1).fill(0);
	for (let t = 1; t <= target; t++) {
		const n = 32 - Math.clz32(t);
		if (t === 2 ** n - 1) {
			shortest[t] = n;
			continue;
		}
		let best = n + 1 + (shortest[2 ** n - 1 - t] ?? 0);
		for (let m = 0; m < n - 1; m++) {
			const back = 2 ** m - 1;
			best = Math.min(
				best,
				n - 1 + 1 + m + 1 + (shortest[t - (2 ** (n - 1) - 1) + back] ?? 0),
			);
		}
		shortest[t] = best;
	}
	return shortest[target] ?? 0;
};
