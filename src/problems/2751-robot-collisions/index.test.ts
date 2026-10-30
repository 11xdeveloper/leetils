import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { robotCollisions as survivedRobotsHealths } from ".";

/** Simulates collisions in half-unit time steps. */
const byBruteForce = (
	positions: number[],
	healths: number[],
	directions: string,
): number[] => {
	const robots = positions.map((p, i) => ({
		at: 2 * p,
		health: healths[i] ?? 0,
		step: directions.charAt(i) === "R" ? 1 : -1,
	}));
	for (let t = 0; t < 200; t++) {
		for (const robot of robots) if (robot.health > 0) robot.at += robot.step;
		const byPlace = new Map<number, typeof robots>();
		for (const robot of robots)
			if (robot.health > 0)
				byPlace.set(robot.at, [...(byPlace.get(robot.at) ?? []), robot]);
		for (const [a, b] of byPlace.values()) {
			if (!a || !b) continue;
			if (a.health === b.health) {
				a.health = 0;
				b.health = 0;
			} else {
				const [strong, weak] = a.health > b.health ? [a, b] : [b, a];
				weak.health = 0;
				strong.health--;
			}
		}
	}
	return robots.map((r) => r.health).filter((h) => h > 0);
};

describe("2751. Robot Collisions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			survivedRobotsHealths([5, 4, 3, 2, 1], [2, 17, 9, 15, 10], "RRRRR"),
		).toEqual([2, 17, 9, 15, 10]);
		expect(
			survivedRobotsHealths([3, 5, 2, 6], [10, 10, 15, 12], "RLRL"),
		).toEqual([14]);
		expect(
			survivedRobotsHealths([1, 2, 5, 6], [10, 10, 11, 11], "RLRL"),
		).toEqual([]);
	});

	it("matches simulating on random inputs", () => {
		const random = createRandom(2751);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 7);
			const positions = [...new Set(random.array(n, 1, 30))];
			const healths = random.array(positions.length, 1, 5);
			const directions = random.string(positions.length, "LR");
			expect(survivedRobotsHealths(positions, healths, directions)).toEqual(
				byBruteForce(positions, healths, directions),
			);
		}
	});
});
