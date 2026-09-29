import { describe, expect, it } from "bun:test";
import { DesignCompressedStringIterator as StringIterator } from ".";

describe("604. Design Compressed String Iterator", () => {
	it("solves the example from the problem statement", () => {
		const iterator = new StringIterator("L1e2t1C1o1d1e1");
		expect(["L", "e", "e", "t", "C", "o"].map(() => iterator.next())).toEqual([
			"L",
			"e",
			"e",
			"t",
			"C",
			"o",
		]);
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe("d");
		expect(iterator.hasNext()).toBeTrue();
		expect(iterator.next()).toBe("e");
		expect(iterator.hasNext()).toBeFalse();
		expect(iterator.next()).toBe(" ");
	});

	it("handles multi-digit and huge counts without expanding them", () => {
		const iterator = new StringIterator("a12B1000000000");
		for (let i = 0; i < 12; i++) expect(iterator.next()).toBe("a");
		for (let i = 0; i < 100; i++) expect(iterator.next()).toBe("B");
		expect(iterator.hasNext()).toBeTrue();
	});
});
