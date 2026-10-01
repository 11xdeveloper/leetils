import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfRefuelingStops as minRefuelStops } from ".";

/** DP over stations: the farthest reach using each number of stops. */
const byDynamicProgramming = (
	target: number,
	startFuel: number,
	stations: number[][],
): number => {
	const reach = [startFuel, ...stations.map(() => 0)];
	for (const [i, [position = 0, fuel = 0]] of stations.entries()) {
		for (let stops = i; stops >= 0; stops--) {
			if ((reach[stops] ?? 0) >= position)
				reach[stops + 1] = Math.max(
					reach[stops + 1] ?? 0,
					(reach[stops] ?? 0) + fuel,
				);
		}
	}
	const stops = reach.findIndex((distance) => distance >= target);
	return stops;
};

describe("871. Minimum Number of Refueling Stops", () => {
	it("solves the examples from the problem statement", () => {
		expect(minRefuelStops(1, 1, [])).toBe(0);
		expect(minRefuelStops(100, 1, [[10, 100]])).toBe(-1);
		expect(
			minRefuelStops(100, 10, [
				[10, 60],
				[20, 30],
				[30, 30],
				[60, 40],
			]),
		).toBe(2);
	});

	it("matches dynamic programming over stops on random routes", () => {
		const random = createRandom(871);
		for (let run = 0; run < 1000; run++) {
			const target = random.int(1, 100);
			const positions = [
				...new Set(random.array(random.int(0, 8), 1, target - 1 || 1)),
			]
				.filter((p) => p < target)
				.sort((a, b) => a - b);
			const stations = positions.map((position) => [
				position,
				random.int(1, 40),
			]);
			const startFuel = random.int(1, 40);
			expect(minRefuelStops(target, startFuel, stations)).toBe(
				byDynamicProgramming(target, startFuel, stations),
			);
		}
	});
});
