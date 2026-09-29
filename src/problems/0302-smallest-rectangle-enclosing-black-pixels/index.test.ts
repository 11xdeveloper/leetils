import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestRectangleEnclosingBlackPixels as area } from ".";

const byScanning = (image: string[][]): number => {
	const cells = image.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell === "1" ? [[r, c] as const] : [])),
	);
	const rs = cells.map(([r]) => r);
	const cs = cells.map(([, c]) => c);
	return (
		(Math.max(...rs) - Math.min(...rs) + 1) *
		(Math.max(...cs) - Math.min(...cs) + 1)
	);
};

describe("302. Smallest Rectangle Enclosing Black Pixels", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			area(
				[
					["0", "0", "1", "0"],
					["0", "1", "1", "0"],
					["0", "1", "0", "0"],
				],
				0,
				2,
			),
		).toBe(6);
		expect(area([["1"]], 0, 0)).toBe(1);
	});

	it("matches scanning every pixel on random connected regions", () => {
		const random = createRandom(302);
		for (let run = 0; run < 500; run++) {
			const rows = random.int(1, 8);
			const columns = random.int(1, 8);
			const image = Array.from({ length: rows }, () =>
				new Array<string>(columns).fill("0"),
			);
			// Grow a connected region with a random walk.
			let [r, c] = [random.int(0, rows - 1), random.int(0, columns - 1)];
			const start = [r, c] as const;
			for (let step = random.int(0, 20); step >= 0; step--) {
				const row = image[r];
				if (row) row[c] = "1";
				const [dr = 0, dc = 0] =
					[
						[1, 0],
						[-1, 0],
						[0, 1],
						[0, -1],
					][random.int(0, 3)] ?? [];
				r = Math.min(rows - 1, Math.max(0, r + dr));
				c = Math.min(columns - 1, Math.max(0, c + dc));
			}
			expect(area(image, start[0], start[1])).toBe(byScanning(image));
		}
	});
});
