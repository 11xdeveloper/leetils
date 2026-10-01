import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { putBoxesIntoTheWarehouseII as maxBoxesInWarehouse } from ".";

/** Tries every sequence of boxes and sides, sliding each box as far as it goes. */
const byBruteForce = (boxes: number[], warehouse: number[]): number => {
	const n = warehouse.length;
	let best = 0;
	const push = (left: number[], filled: boolean[], count: number): void => {
		best = Math.max(best, count);
		left.forEach((box, i) => {
			for (const fromLeft of [true, false]) {
				let room = -1;
				for (let step = 0; step < n; step++) {
					const next = fromLeft ? step : n - 1 - step;
					if (filled[next] || (warehouse[next] ?? 0) < box) break;
					room = next;
				}
				if (room === -1) continue;
				push(
					left.filter((_, j) => j !== i),
					filled.with(room, true),
					count + 1,
				);
			}
		});
	};
	push(boxes, new Array<boolean>(n).fill(false), 0);
	return best;
};

describe("1580. Put Boxes Into the Warehouse II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxBoxesInWarehouse([1, 2, 2, 3, 4], [3, 4, 1, 2])).toBe(4);
		expect(maxBoxesInWarehouse([3, 5, 5, 2], [2, 1, 3, 4, 5])).toBe(3);
	});

	it("matches pushing boxes in every order on random inputs", () => {
		const random = createRandom(1580);
		for (let run = 0; run < 150; run++) {
			const boxes = random.array(random.int(1, 4), 1, 5);
			const warehouse = random.array(random.int(1, 5), 1, 5);
			expect(maxBoxesInWarehouse(boxes, warehouse)).toBe(
				byBruteForce(boxes, warehouse),
			);
		}
	});
});
