import { describe, expect, it } from "bun:test";
import { minimumGardenPerimeterToCollectEnoughApples as minimumPerimeter } from ".";

describe("1954. Minimum Garden Perimeter to Collect Enough Apples", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPerimeter(1)).toBe(8);
		expect(minimumPerimeter(13)).toBe(16);
		expect(minimumPerimeter(1000000000)).toBe(5040);
	});

	it("matches counting apples tree by tree for small squares", () => {
		for (let n = 1; n <= 10; n++) {
			let apples = 0;
			for (let i = -n; i <= n; i++)
				for (let j = -n; j <= n; j++) apples += Math.abs(i) + Math.abs(j);
			expect(minimumPerimeter(apples)).toBe(8 * n);
			expect(minimumPerimeter(apples + 1)).toBe(8 * (n + 1));
		}
	});
});
