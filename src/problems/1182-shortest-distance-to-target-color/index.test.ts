import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestDistanceToTargetColor as shortestDistanceColor } from ".";

describe("1182. Shortest Distance to Target Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestDistanceColor(
				[1, 1, 2, 1, 3, 2, 2, 3, 3],
				[
					[1, 3],
					[2, 2],
					[6, 1],
				],
			),
		).toEqual([3, 0, 3]);
		expect(shortestDistanceColor([1, 2], [[0, 3]])).toEqual([-1]);
	});

	it("matches scanning every index on random inputs", () => {
		const random = createRandom(1182);
		for (let run = 0; run < 300; run++) {
			const colors = random.array(random.int(1, 12), 1, 3);
			const queries = Array.from({ length: 5 }, () => [
				random.int(0, colors.length - 1),
				random.int(1, 3),
			]);
			expect(shortestDistanceColor(colors, queries)).toEqual(
				queries.map(([i = 0, c]) => {
					const distances = colors.flatMap((colour, j) =>
						colour === c ? [Math.abs(i - j)] : [],
					);
					return distances.length > 0 ? Math.min(...distances) : -1;
				}),
			);
		}
	});
});
