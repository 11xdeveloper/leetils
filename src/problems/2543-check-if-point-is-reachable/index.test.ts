import { describe, expect, it } from "bun:test";
import { checkIfPointIsReachable as isReachable } from ".";

/** Explores every point reachable within a bound. */
const reachableWithin = (limit: number): Set<string> => {
	const seen = new Set(["1,1"]);
	const stack: [number, number][] = [[1, 1]];
	for (let point = stack.pop(); point; point = stack.pop()) {
		const [x, y] = point;
		for (const [nx, ny] of [
			[x, y - x],
			[x - y, y],
			[2 * x, y],
			[x, 2 * y],
		] as const) {
			if (
				nx < 1 ||
				ny < 1 ||
				nx > limit ||
				ny > limit ||
				seen.has(`${nx},${ny}`)
			)
				continue;
			seen.add(`${nx},${ny}`);
			stack.push([nx, ny]);
		}
	}
	return seen;
};

describe("2543. Check if Point Is Reachable", () => {
	it("solves the examples from the problem statement", () => {
		expect(isReachable(6, 9)).toBe(false);
		expect(isReachable(4, 7)).toBe(true);
	});

	it("matches exploring every move on small points", () => {
		const seen = reachableWithin(64);
		for (let x = 1; x <= 30; x++)
			for (let y = 1; y <= 30; y++)
				expect(isReachable(x, y)).toBe(seen.has(`${x},${y}`));
	});
});
