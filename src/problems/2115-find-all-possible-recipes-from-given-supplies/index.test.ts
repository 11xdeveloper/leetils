import { describe, expect, it } from "bun:test";
import { findAllPossibleRecipesFromGivenSupplies as findAllRecipes } from ".";

describe("2115. Find All Possible Recipes from Given Supplies", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findAllRecipes(
				["bread"],
				[["yeast", "flour"]],
				["yeast", "flour", "corn"],
			),
		).toEqual(["bread"]);
		expect(
			findAllRecipes(
				["bread", "sandwich"],
				[
					["yeast", "flour"],
					["bread", "meat"],
				],
				["yeast", "flour", "meat"],
			),
		).toEqual(["bread", "sandwich"]);
		expect(
			findAllRecipes(
				["bread", "sandwich", "burger"],
				[
					["yeast", "flour"],
					["bread", "meat"],
					["sandwich", "meat", "bread"],
				],
				["yeast", "flour", "meat"],
			),
		).toEqual(["bread", "sandwich", "burger"]);
	});

	it("can't make recipes that depend on each other", () => {
		expect(
			findAllRecipes(
				["a", "b"],
				[
					["b", "x"],
					["a", "x"],
				],
				["x"],
			),
		).toEqual([]);
	});
});
