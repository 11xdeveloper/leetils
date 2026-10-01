import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { repeatedDnaSequences } from ".";

const byCounting = (s: string): string[] => {
	const windows = Array.from({ length: Math.max(0, s.length - 9) }, (_, i) =>
		s.slice(i, i + 10),
	);
	return [...new Set(windows.filter((w, i) => windows.indexOf(w) !== i))];
};

describe("187. Repeated DNA Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			repeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT").toSorted(),
		).toEqual(["AAAAACCCCC", "CCCCCAAAAA"]);
		expect(repeatedDnaSequences("AAAAAAAAAAAAA")).toEqual(["AAAAAAAAAA"]);
	});

	it("returns nothing for strings of 10 letters or fewer", () => {
		expect(repeatedDnaSequences("ACGT")).toEqual([]);
		expect(repeatedDnaSequences("ACGTACGTAC")).toEqual([]);
	});

	it("matches counting every window on random sequences", () => {
		const random = createRandom(187);
		for (let run = 0; run < 300; run++) {
			const s = random.string(
				random.int(1, 40),
				random.int(0, 1) === 0 ? "AC" : "ACGT",
			);
			expect(repeatedDnaSequences(s).toSorted()).toEqual(
				byCounting(s).toSorted(),
			);
		}
	});
});
