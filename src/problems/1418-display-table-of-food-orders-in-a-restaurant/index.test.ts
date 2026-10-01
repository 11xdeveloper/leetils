import { describe, expect, it } from "bun:test";
import { displayTableOfFoodOrdersInARestaurant as displayTable } from ".";

describe("1418. Display Table of Food Orders in a Restaurant", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			displayTable([
				["David", "3", "Ceviche"],
				["Corina", "10", "Beef Burrito"],
				["David", "3", "Fried Chicken"],
				["Carla", "5", "Water"],
				["Carla", "5", "Ceviche"],
				["Rous", "3", "Ceviche"],
			]),
		).toEqual([
			["Table", "Beef Burrito", "Ceviche", "Fried Chicken", "Water"],
			["3", "0", "2", "1", "0"],
			["5", "0", "1", "0", "1"],
			["10", "1", "0", "0", "0"],
		]);
		expect(
			displayTable([
				["James", "12", "Fried Chicken"],
				["Ratesh", "12", "Fried Chicken"],
				["Amadeus", "12", "Fried Chicken"],
				["Adam", "1", "Canadian Waffles"],
				["Brianna", "1", "Canadian Waffles"],
			]),
		).toEqual([
			["Table", "Canadian Waffles", "Fried Chicken"],
			["1", "2", "0"],
			["12", "0", "3"],
		]);
		expect(
			displayTable([
				["Laura", "2", "Bean Burrito"],
				["Jhon", "2", "Beef Burrito"],
				["Melissa", "2", "Soda"],
			]),
		).toEqual([
			["Table", "Bean Burrito", "Beef Burrito", "Soda"],
			["2", "1", "1", "1"],
		]);
	});

	it("sorts foods by character code, capitals first", () => {
		expect(
			displayTable([
				["a", "1", "apple"],
				["b", "1", "Zucchini"],
			])[0],
		).toEqual(["Table", "Zucchini", "apple"]);
	});
});
