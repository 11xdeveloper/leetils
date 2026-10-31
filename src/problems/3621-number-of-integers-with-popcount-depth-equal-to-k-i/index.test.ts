import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfIntegersWithPopcountDepthEqualToKI as popcountDepth } from ".";

const depth = (x: number): number => {
	let steps = 0;
	for (; x !== 1; steps++) x = x.toString(2).split("1").length - 1;
	return steps;
};

describe("3621. Number of Integers With Popcount-Depth Equal to K I", () => {
	it("solves the examples from the problem statement", () => {
		expect(popcountDepth(4, 1)).toBe(2);
		expect(popcountDepth(7, 2)).toBe(3);
	});

	it("matches checking every number up to random limits", () => {
		const random = createRandom(3621);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 3000);
			const k = random.int(0, 4);
			let expected = 0;
			for (let x = 1; x <= n; x++) if (depth(x) === k) expected++;
			expect(popcountDepth(n, k)).toBe(expected);
		}
	});
});
