import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { widestPairOfIndicesWithEqualRangeSum as widestPairOfIndices } from ".";

describe("1983. Widest Pair of Indices With Equal Range Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(widestPairOfIndices([1, 1, 0, 1], [0, 1, 1, 0])).toBe(3);
		expect(widestPairOfIndices([0, 1], [1, 1])).toBe(1);
		expect(widestPairOfIndices([0], [1])).toBe(0);
	});

	it("matches checking every range on random inputs", () => {
		const random = createRandom(1983);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const [a, b] = [random.array(n, 0, 1), random.array(n, 0, 1)];
			let widest = 0;
			for (let i = 0; i < n; i++) {
				for (let j = i; j < n; j++) {
					const sum = (x: number[]) =>
						x.slice(i, j + 1).reduce((s, v) => s + v, 0);
					if (sum(a) === sum(b)) widest = Math.max(widest, j - i + 1);
				}
			}
			expect(widestPairOfIndices(a, b)).toBe(widest);
		}
	});
});
