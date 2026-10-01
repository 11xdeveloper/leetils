import { describe, expect, it } from "bun:test";
import { DesignUndergroundSystem as UndergroundSystem } from ".";

describe("1396. Design Underground System", () => {
	it("solves the examples from the problem statement", () => {
		const first = new UndergroundSystem();
		first.checkIn(45, "Leyton", 3);
		first.checkIn(32, "Paradise", 8);
		first.checkIn(27, "Leyton", 10);
		first.checkOut(45, "Waterloo", 15);
		first.checkOut(27, "Waterloo", 20);
		first.checkOut(32, "Cambridge", 22);
		expect(first.getAverageTime("Paradise", "Cambridge")).toBeCloseTo(14);
		expect(first.getAverageTime("Leyton", "Waterloo")).toBeCloseTo(11);
		first.checkIn(10, "Leyton", 24);
		expect(first.getAverageTime("Leyton", "Waterloo")).toBeCloseTo(11);
		first.checkOut(10, "Waterloo", 38);
		expect(first.getAverageTime("Leyton", "Waterloo")).toBeCloseTo(12);

		const second = new UndergroundSystem();
		for (const [id, start, end] of [
			[10, 3, 8],
			[5, 10, 16],
			[2, 21, 30],
		] as const) {
			second.checkIn(id, "Leyton", start);
			second.checkOut(id, "Paradise", end);
		}
		expect(second.getAverageTime("Leyton", "Paradise")).toBeCloseTo(20 / 3);
	});

	it("keeps directions separate and station names unambiguous", () => {
		const underground = new UndergroundSystem();
		underground.checkIn(1, "A", 0);
		underground.checkOut(1, "B", 10);
		underground.checkIn(1, "B", 20);
		underground.checkOut(1, "A", 22);
		underground.checkIn(2, "AB", 0);
		underground.checkOut(2, "C", 100);
		underground.checkIn(3, "A", 0);
		underground.checkOut(3, "BC", 50);
		expect(underground.getAverageTime("A", "B")).toBe(10);
		expect(underground.getAverageTime("B", "A")).toBe(2);
		expect(underground.getAverageTime("AB", "C")).toBe(100);
		expect(underground.getAverageTime("A", "BC")).toBe(50);
	});
});
