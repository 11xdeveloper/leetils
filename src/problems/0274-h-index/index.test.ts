import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { hIndex } from ".";

const byDefinition = (citations: number[]): number => {
	let h = 0;
	while (citations.filter((c) => c >= h + 1).length >= h + 1) h++;
	return h;
};

describe("274. H-Index", () => {
	it("solves the examples from the problem statement", () => {
		expect(hIndex([3, 0, 6, 1, 5])).toBe(3);
		expect(hIndex([1, 3, 1])).toBe(1);
	});

	it("handles uncited papers and very highly cited ones", () => {
		expect(hIndex([0, 0])).toBe(0);
		expect(hIndex([1000, 1000])).toBe(2);
	});

	it("matches the definition on random inputs", () => {
		const random = createRandom(274);
		for (let run = 0; run < 1000; run++) {
			const citations = random.array(random.int(1, 15), 0, 20);
			expect(hIndex(citations)).toBe(byDefinition(citations));
		}
	});
});
