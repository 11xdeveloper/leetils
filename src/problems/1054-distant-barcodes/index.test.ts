import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distantBarcodes as rearrangeBarcodes } from ".";

describe("1054. Distant Barcodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(rearrangeBarcodes([1, 1, 1, 2, 2, 2])).toEqual([1, 2, 1, 2, 1, 2]);
		const second = rearrangeBarcodes([1, 1, 1, 1, 2, 2, 3, 3]);
		expect(
			second.every((code, i) => i === 0 || code !== second[i - 1]),
		).toBeTrue();
	});

	it("separates equal barcodes whenever possible on random inputs", () => {
		const random = createRandom(1054);
		for (let run = 0; run < 1000; run++) {
			const barcodes = random.array(random.int(1, 15), 1, 4);
			const most = Math.max(
				...[...new Set(barcodes)].map(
					(code) => barcodes.filter((c) => c === code).length,
				),
			);
			if (most > Math.ceil(barcodes.length / 2)) continue;
			const result = rearrangeBarcodes(barcodes);
			expect(result.toSorted()).toEqual(barcodes.toSorted());
			expect(
				result.every((code, i) => i === 0 || code !== result[i - 1]),
			).toBeTrue();
		}
	});
});
