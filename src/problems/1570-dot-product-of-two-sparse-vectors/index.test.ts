import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DotProductOfTwoSparseVectors as SparseVector } from ".";

const dot = (a: number[], b: number[]) =>
	new SparseVector(a).dotProduct(new SparseVector(b));

describe("1570. Dot Product of Two Sparse Vectors", () => {
	it("solves the examples from the problem statement", () => {
		expect(dot([1, 0, 0, 2, 3], [0, 3, 0, 4, 0])).toBe(8);
		expect(dot([0, 1, 0, 0, 0], [0, 0, 0, 0, 2])).toBe(0);
		expect(dot([0, 1, 0, 0, 2, 0, 0], [1, 0, 0, 0, 3, 0, 4])).toBe(6);
	});

	it("matches the dense dot product on random vectors", () => {
		const random = createRandom(1570);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 15);
			const make = () =>
				Array.from({ length: n }, () =>
					random.next() < 0.3 ? random.int(1, 100) : 0,
				);
			const [a, b] = [make(), make()];
			expect(dot(a, b)).toBe(a.reduce((sum, x, i) => sum + x * (b[i] ?? 0), 0));
		}
	});
});
