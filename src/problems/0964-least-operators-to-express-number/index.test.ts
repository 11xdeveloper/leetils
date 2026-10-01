import { describe, expect, it } from "bun:test";
import { Heap } from "../../internal/heap";
import { leastOperatorsToExpressNumber as leastOpsExpressTarget } from ".";

/** Dijkstra over running totals, adding signed powers of x at their operator cost. */
const byDijkstra = (x: number, target: number): number => {
	const limit = target * x + x;
	const terms: [value: number, cost: number][] = [[1, 2]];
	for (let power = x, e = 1; power <= limit; power *= x, e++)
		terms.push([power, e]);
	const best = new Map([[0, 0]]);
	const queue = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, 0]]);
	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [cost, value] = entry;
		if (cost > (best.get(value) ?? Infinity)) continue;
		if (value === target) return cost - 1;
		for (const [term, termCost] of terms) {
			for (const next of [value + term, value - term]) {
				if (
					Math.abs(next) > limit ||
					cost + termCost >= (best.get(next) ?? Infinity)
				)
					continue;
				best.set(next, cost + termCost);
				queue.push([cost + termCost, next]);
			}
		}
	}
	return -1;
};

describe("964. Least Operators to Express Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(leastOpsExpressTarget(3, 19)).toBe(5);
		expect(leastOpsExpressTarget(5, 501)).toBe(8);
		expect(leastOpsExpressTarget(100, 100000000)).toBe(3);
	});

	it("matches searching sums of signed powers for small inputs", () => {
		for (let x = 2; x <= 6; x++)
			for (let target = 1; target <= 150; target++)
				expect(leastOpsExpressTarget(x, target)).toBe(byDijkstra(x, target));
	});
});
