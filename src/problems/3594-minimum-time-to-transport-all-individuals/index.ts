import { Heap } from "../../internal/heap";

/**
 * 3594. Minimum Time to Transport All Individuals
 *
 * `n` people cross a river by a boat holding `k`. A crossing takes the
 * slowest rower's `time` times the current stage's `mul`, and moves the
 * stage on by the floor of that time (mod `m`); after each crossing that
 * leaves people behind, one person rows back the same way. Returns the
 * least total time, or -1 if not everyone can cross.
 *
 * Dijkstra over who has crossed, the stage and the boat's side: from the
 * start side, send any group of up to k; from the far side, send one back.
 *
 * @see https://leetcode.com/problems/minimum-time-to-transport-all-individuals/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · m · C(n, ≤k) · log(2ⁿ · m))
 * @spaceComplexity O(2ⁿ · m)
 *
 * @example
 * minimumTimeToTransportAllIndividuals(3, 2, 3, [2, 5, 8], [1.0, 1.5, 0.75]); // 14.5
 */
export const minimumTimeToTransportAllIndividuals = (
	n: number,
	k: number,
	m: number,
	time: readonly number[],
	mul: readonly number[],
): number => {
	const full = (1 << n) - 1;
	const slowest = new Float64Array(1 << n);
	const bits = new Uint8Array(1 << n);
	for (let mask = 1; mask <= full; mask++) {
		const low = 31 - Math.clz32(mask & -mask);
		slowest[mask] = Math.max(slowest[mask & (mask - 1)] ?? 0, time[low] ?? 0);
		bits[mask] = (bits[mask & (mask - 1)] ?? 0) + 1;
	}
	// State: (crossed mask · m + stage) · 2 + side, side 1 meaning the boat is across.
	const best = new Float64Array((full + 1) * m * 2).fill(
		Number.POSITIVE_INFINITY,
	);
	const heap = new Heap<[cost: number, state: number]>((a, b) => a[0] - b[0]);
	const relax = (state: number, cost: number): void => {
		if (cost < (best[state] ?? Number.POSITIVE_INFINITY)) {
			best[state] = cost;
			heap.push([cost, state]);
		}
	};
	relax(0, 0);
	while (heap.size > 0) {
		const [cost, state] = heap.pop() ?? [0, 0];
		if (cost > (best[state] ?? 0)) continue;
		const side = state % 2;
		const stage = Math.floor(state / 2) % m;
		const crossed = Math.floor(state / 2 / m);
		if (side === 1) {
			if (crossed === full) return cost;
			for (let person = 0; person < n; person++) {
				if (!((crossed >> person) & 1)) continue;
				const trip = (time[person] ?? 0) * (mul[stage] ?? 0);
				const next = (stage + Math.floor(trip)) % m;
				relax(((crossed ^ (1 << person)) * m + next) * 2, cost + trip);
			}
			continue;
		}
		const waiting = full ^ crossed;
		for (let group = waiting; group > 0; group = (group - 1) & waiting) {
			if ((bits[group] ?? 0) > k) continue;
			const trip = (slowest[group] ?? 0) * (mul[stage] ?? 0);
			const next = (stage + Math.floor(trip)) % m;
			relax(((crossed | group) * m + next) * 2 + 1, cost + trip);
		}
	}
	return -1;
};
