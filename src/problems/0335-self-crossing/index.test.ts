import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { selfCrossing } from ".";

/** Walks the path one unit at a time, checking for any repeated point. */
const byWalking = (distance: number[]): boolean => {
	const directions = [
		[0, 1],
		[-1, 0],
		[0, -1],
		[1, 0],
	] as const;
	const visited = new Set(["0,0"]);
	let [x, y] = [0, 0];
	for (const [i, steps] of distance.entries()) {
		const [dx, dy] = directions[i % 4] ?? [0, 0];
		for (let step = 0; step < steps; step++) {
			x += dx;
			y += dy;
			if (visited.has(`${x},${y}`)) return true;
			visited.add(`${x},${y}`);
		}
	}
	return false;
};

describe("335. Self Crossing", () => {
	it("solves the examples from the problem statement", () => {
		expect(selfCrossing([2, 1, 1, 2])).toBeTrue();
		expect(selfCrossing([1, 2, 3, 4])).toBeFalse();
		expect(selfCrossing([1, 1, 1, 2, 1])).toBeTrue();
	});

	it("handles spirals that grow and then shrink without crossing", () => {
		expect(selfCrossing([2, 4, 6, 8, 5, 3, 1])).toBeFalse();
	});

	it("matches walking the path on random inputs", () => {
		const random = createRandom(335);
		for (let run = 0; run < 3000; run++) {
			const distance = random.array(random.int(1, 9), 1, 5);
			expect(selfCrossing(distance)).toBe(byWalking(distance));
		}
	});
});
