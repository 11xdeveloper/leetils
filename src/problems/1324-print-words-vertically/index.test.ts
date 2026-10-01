import { describe, expect, it } from "bun:test";
import { printWordsVertically as printVertically } from ".";

describe("1324. Print Words Vertically", () => {
	it("solves the examples from the problem statement", () => {
		expect(printVertically("HOW ARE YOU")).toEqual(["HAY", "ORO", "WEU"]);
		expect(printVertically("TO BE OR NOT TO BE")).toEqual([
			"TBONTB",
			"OEROOE",
			"   T",
		]);
		expect(printVertically("CONTEST IS COMING")).toEqual([
			"CIC",
			"OSO",
			"N M",
			"T I",
			"E N",
			"S G",
			"T",
		]);
	});

	it("handles a single word", () => {
		expect(printVertically("ABC")).toEqual(["A", "B", "C"]);
	});
});
