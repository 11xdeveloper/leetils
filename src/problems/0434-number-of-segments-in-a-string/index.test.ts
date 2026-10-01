import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSegmentsInAString as countSegments } from ".";

describe("434. Number of Segments in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSegments("Hello, my name is John")).toBe(5);
		expect(countSegments("Hello")).toBe(1);
	});

	it("handles empty strings and extra spaces", () => {
		expect(countSegments("")).toBe(0);
		expect(countSegments("   ")).toBe(0);
		expect(countSegments("  a   b  ")).toBe(2);
	});

	it("matches splitting on spaces on random inputs", () => {
		const random = createRandom(434);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(0, 20), "ab,  ");
			expect(countSegments(s)).toBe(s.split(" ").filter(Boolean).length);
		}
	});
});
