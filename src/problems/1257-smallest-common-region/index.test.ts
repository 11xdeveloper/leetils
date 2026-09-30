import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestCommonRegion as findSmallestRegion } from ".";

const world = [
	["Earth", "North America", "South America"],
	["North America", "United States", "Canada"],
	["United States", "New York", "Boston"],
	["Canada", "Ontario", "Quebec"],
	["South America", "Brazil"],
];

describe("1257. Smallest Common Region", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSmallestRegion(world, "Quebec", "New York")).toBe(
			"North America",
		);
		expect(findSmallestRegion(world, "Canada", "South America")).toBe("Earth");
	});

	it("returns a region when it contains the other", () => {
		expect(findSmallestRegion(world, "Canada", "Quebec")).toBe("Canada");
		expect(findSmallestRegion(world, "Boston", "Earth")).toBe("Earth");
	});

	it("matches comparing root paths on random region trees", () => {
		const random = createRandom(1257);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 15);
			const parents = Array.from({ length: n }, (_, i) =>
				i === 0 ? -1 : random.int(0, i - 1),
			);
			const regions = parents
				.map((_, i) => [
					`r${i}`,
					...parents.flatMap((p, j) => (p === i ? [`r${j}`] : [])),
				])
				.filter((list) => list.length > 1);
			const pathToRoot = (i: number) => {
				const path: number[] = [];
				for (let node = i; node !== -1; node = parents[node] ?? -1)
					path.push(node);
				return path;
			};
			const [a, b] = [random.int(0, n - 1), random.int(0, n - 1)];
			if (a === b) continue;
			const common = pathToRoot(a).find((node) => pathToRoot(b).includes(node));
			expect(findSmallestRegion(regions, `r${a}`, `r${b}`)).toBe(`r${common}`);
		}
	});
});
