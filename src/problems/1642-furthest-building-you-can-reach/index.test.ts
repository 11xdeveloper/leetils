import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { furthestBuildingYouCanReach as furthestBuilding } from ".";

/** Checks each prefix: ladders on its largest climbs, bricks on the rest. */
const byBruteForce = (
	heights: number[],
	bricks: number,
	ladders: number,
): number => {
	let furthest = 0;
	for (let end = 1; end < heights.length; end++) {
		const climbs = heights
			.slice(1, end + 1)
			.map((height, i) => height - (heights[i] ?? 0))
			.filter((climb) => climb > 0)
			.sort((a, b) => b - a);
		const needed = climbs.slice(ladders).reduce((sum, climb) => sum + climb, 0);
		if (needed > bricks) break;
		furthest = end;
	}
	return furthest;
};

describe("1642. Furthest Building You Can Reach", () => {
	it("solves the examples from the problem statement", () => {
		expect(furthestBuilding([4, 2, 7, 6, 9, 14, 12], 5, 1)).toBe(4);
		expect(furthestBuilding([4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2)).toBe(7);
		expect(furthestBuilding([14, 3, 19, 3], 17, 0)).toBe(3);
	});

	it("matches checking every prefix on random inputs", () => {
		const random = createRandom(1642);
		for (let run = 0; run < 300; run++) {
			const heights = random.array(random.int(1, 10), 1, 10);
			const [bricks, ladders] = [random.int(0, 15), random.int(0, 3)];
			expect(furthestBuilding(heights, bricks, ladders)).toBe(
				byBruteForce(heights, bricks, ladders),
			);
		}
	});
});
