import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theSkylineProblem } from ".";

/** Computes the height over every unit of the x-axis and records where it changes. */
const byUnits = (buildings: number[][]): number[][] => {
	const end = Math.max(0, ...buildings.map(([, right = 0]) => right));
	const skyline: number[][] = [];
	for (let x = 0; x <= end; x++) {
		const height = Math.max(
			0,
			...buildings
				.filter(([left = 0, right = 0]) => left <= x && x < right)
				.map(([, , h = 0]) => h),
		);
		if ((skyline.at(-1)?.[1] ?? 0) !== height) skyline.push([x, height]);
	}
	return skyline;
};

describe("218. The Skyline Problem", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			theSkylineProblem([
				[2, 9, 10],
				[3, 7, 15],
				[5, 12, 12],
				[15, 20, 10],
				[19, 24, 8],
			]),
		).toEqual([
			[2, 10],
			[3, 15],
			[7, 12],
			[12, 0],
			[15, 10],
			[20, 8],
			[24, 0],
		]);
		expect(
			theSkylineProblem([
				[0, 2, 3],
				[2, 5, 3],
			]),
		).toEqual([
			[0, 3],
			[5, 0],
		]);
	});

	it("handles buildings that share edges or heights", () => {
		expect(
			theSkylineProblem([
				[1, 2, 1],
				[1, 2, 2],
				[1, 2, 3],
			]),
		).toEqual([
			[1, 3],
			[2, 0],
		]);
	});

	it("matches measuring every unit of the x-axis on random buildings", () => {
		const random = createRandom(218);
		for (let run = 0; run < 500; run++) {
			const buildings = Array.from({ length: random.int(1, 8) }, () => {
				const left = random.int(0, 20);
				return [left, left + random.int(1, 8), random.int(1, 10)];
			}).toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
			expect(theSkylineProblem(buildings)).toEqual(byUnits(buildings));
		}
	});
});
