import { describe, expect, it } from "bun:test";
import { sortThePeople } from ".";

describe("2418. Sort the People", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortThePeople(["Mary", "John", "Emma"], [180, 165, 170])).toEqual([
			"Mary",
			"Emma",
			"John",
		]);
		expect(sortThePeople(["Alice", "Bob", "Bob"], [155, 185, 150])).toEqual([
			"Bob",
			"Alice",
			"Bob",
		]);
	});
});
