import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { deliveringBoxesFromStorageToPorts as boxDelivering } from ".";

/** The quadratic dynamic program, counting each load's trips directly. */
const byBruteForce = (
	boxes: number[][],
	maxBoxes: number,
	maxWeight: number,
): number => {
	const best = [0];
	for (let i = 1; i <= boxes.length; i++) {
		let cheapest = Infinity;
		for (let j = i - 1; j >= 0 && i - j <= maxBoxes; j--) {
			const load = boxes.slice(j, i);
			if (load.reduce((sum, [, w = 0]) => sum + w, 0) > maxWeight) break;
			const trips =
				1 +
				load.filter(([port], k) => k === 0 || port !== load[k - 1]?.[0]).length;
			cheapest = Math.min(cheapest, (best[j] ?? 0) + trips);
		}
		best.push(cheapest);
	}
	return best[boxes.length] ?? 0;
};

describe("1687. Delivering Boxes from Storage to Ports", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			boxDelivering(
				[
					[1, 1],
					[2, 1],
					[1, 1],
				],
				2,
				3,
				3,
			),
		).toBe(4);
		expect(
			boxDelivering(
				[
					[1, 2],
					[3, 3],
					[3, 1],
					[3, 1],
					[2, 4],
				],
				3,
				3,
				6,
			),
		).toBe(6);
		expect(
			boxDelivering(
				[
					[1, 4],
					[1, 2],
					[2, 1],
					[2, 1],
					[3, 2],
					[3, 4],
				],
				3,
				6,
				7,
			),
		).toBe(6);
	});

	it("matches the quadratic dynamic program on random inputs", () => {
		const random = createRandom(1687);
		for (let run = 0; run < 300; run++) {
			const maxWeight = random.int(1, 8);
			const boxes = Array.from({ length: random.int(1, 12) }, () => [
				random.int(1, 3),
				random.int(1, maxWeight),
			]);
			const maxBoxes = random.int(1, 5);
			expect(boxDelivering(boxes, 3, maxBoxes, maxWeight)).toBe(
				byBruteForce(boxes, maxBoxes, maxWeight),
			);
		}
	});
});
