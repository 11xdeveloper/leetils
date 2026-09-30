import { describe, expect, it } from "bun:test";
import { containVirus } from ".";

describe("749. Contain Virus", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			containVirus([
				[0, 1, 0, 0, 0, 0, 0, 1],
				[0, 1, 0, 0, 0, 0, 0, 1],
				[0, 0, 0, 0, 0, 0, 0, 1],
				[0, 0, 0, 0, 0, 0, 0, 0],
			]),
		).toBe(10);
		expect(
			containVirus([
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toBe(4);
		expect(
			containVirus([
				[1, 1, 1, 0, 0, 0, 0, 0, 0],
				[1, 0, 1, 0, 1, 1, 1, 1, 1],
				[1, 1, 1, 0, 0, 0, 0, 0, 0],
			]),
		).toBe(13);
	});

	it("needs no walls when nothing can spread", () => {
		expect(
			containVirus([
				[0, 0],
				[0, 0],
			]),
		).toBe(0);
		expect(
			containVirus([
				[1, 1],
				[1, 1],
			]),
		).toBe(0);
	});

	it("walls a single infected cell on all four sides", () => {
		expect(
			containVirus([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0],
			]),
		).toBe(4);
		expect(
			containVirus([
				[1, 0],
				[0, 0],
			]),
		).toBe(2);
	});
});
