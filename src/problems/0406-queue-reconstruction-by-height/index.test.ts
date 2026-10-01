import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { queueReconstructionByHeight as reconstruct } from ".";

/** Computes each person's [h, k] from a queue of heights. */
const describeQueue = (heights: number[]): number[][] =>
	heights.map((h, i) => [
		h,
		heights.slice(0, i).filter((other) => other >= h).length,
	]);

describe("406. Queue Reconstruction by Height", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			reconstruct([
				[7, 0],
				[4, 4],
				[7, 1],
				[5, 0],
				[6, 1],
				[5, 2],
			]),
		).toEqual([
			[5, 0],
			[7, 0],
			[5, 2],
			[6, 1],
			[4, 4],
			[7, 1],
		]);
		expect(
			reconstruct([
				[6, 0],
				[5, 0],
				[4, 0],
				[3, 2],
				[2, 2],
				[1, 4],
			]),
		).toEqual([
			[4, 0],
			[5, 0],
			[2, 2],
			[3, 2],
			[1, 4],
			[6, 0],
		]);
	});

	it("rebuilds random queues from their shuffled descriptions", () => {
		const random = createRandom(406);
		for (let run = 0; run < 500; run++) {
			const heights = random.array(random.int(1, 12), 1, 6);
			const people = describeQueue(heights);
			const shuffled = people.toSorted(() => random.next() - 0.5);
			expect(reconstruct(shuffled)).toEqual(people);
		}
	});
});
