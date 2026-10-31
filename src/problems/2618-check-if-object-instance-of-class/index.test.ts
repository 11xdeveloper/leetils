import { describe, expect, it } from "bun:test";
import { checkIfObjectInstanceOfClass } from ".";

describe("2618. Check if Object Instance of Class", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkIfObjectInstanceOfClass(new Date(), Date)).toBeTrue();
		class Animal {}
		class Dog extends Animal {}
		expect(checkIfObjectInstanceOfClass(new Dog(), Animal)).toBeTrue();
		expect(checkIfObjectInstanceOfClass(Date, Date)).toBeFalse();
		expect(checkIfObjectInstanceOfClass(5, Number)).toBeTrue();
	});

	it("handles null, undefined and non-class targets", () => {
		expect(checkIfObjectInstanceOfClass(null, Object)).toBeFalse();
		expect(checkIfObjectInstanceOfClass(undefined, Object)).toBeFalse();
		expect(checkIfObjectInstanceOfClass({}, {})).toBeFalse();
		expect(checkIfObjectInstanceOfClass("a", String)).toBeTrue();
		expect(checkIfObjectInstanceOfClass("a", Object)).toBeTrue();
		expect(
			checkIfObjectInstanceOfClass(Object.create(null), Object),
		).toBeFalse();
	});
});
