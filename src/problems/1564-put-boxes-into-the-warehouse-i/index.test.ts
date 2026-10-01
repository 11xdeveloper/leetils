import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { putBoxesIntoTheWarehouseI as maxBoxesInWarehouse } from ".";

/** Tries every ordered choice of boxes, pushing each as far in as it can go. */
const byBruteForce = (boxes: number[], warehouse: number[]): number => {
	let best = 0;
	const push = (left: number[], depth: number, count: number): void => {
		best = Math.max(best, count);
		left.forEach((box, i) => {
			let room = -1;
			while (room + 1 < depth && (warehouse[room + 1] ?? 0) >= box) room++;
			if (room === -1) return;
			push(
				left.filter((_, j) => j !== i),
				room,
				count + 1,
			);
		});
	};
	push(boxes, warehouse.length, 0);
	return best;
};

describe("1564. Put Boxes Into the Warehouse I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxBoxesInWarehouse([4, 3, 4, 1], [5, 3, 3, 4, 1])).toBe(3);
		expect(maxBoxesInWarehouse([1, 2, 2, 3, 4], [3, 4, 1, 2])).toBe(3);
		expect(maxBoxesInWarehouse([1, 2, 3], [1, 2, 3, 4])).toBe(1);
	});

	it("matches pushing boxes in every order on random inputs", () => {
		const random = createRandom(1564);
		for (let run = 0; run < 200; run++) {
			const boxes = random.array(random.int(1, 5), 1, 6);
			const warehouse = random.array(random.int(1, 5), 1, 6);
			expect(maxBoxesInWarehouse(boxes, warehouse)).toBe(
				byBruteForce(boxes, warehouse),
			);
		}
	});
});
