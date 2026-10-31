import { describe, expect, it } from "bun:test";
import { DesignAFoodRatingSystem as FoodRatings } from ".";

describe("2353. Design a Food Rating System", () => {
	it("solves the example from the problem statement", () => {
		const ratings = new FoodRatings(
			["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"],
			["korean", "japanese", "japanese", "greek", "japanese", "korean"],
			[9, 12, 8, 15, 14, 7],
		);
		expect(ratings.highestRated("korean")).toBe("kimchi");
		expect(ratings.highestRated("japanese")).toBe("ramen");
		ratings.changeRating("sushi", 16);
		expect(ratings.highestRated("japanese")).toBe("sushi");
		ratings.changeRating("ramen", 16);
		expect(ratings.highestRated("japanese")).toBe("ramen");
	});

	it("drops a lowered rating", () => {
		const ratings = new FoodRatings(["a", "b"], ["x", "x"], [5, 4]);
		ratings.changeRating("a", 1);
		expect(ratings.highestRated("x")).toBe("b");
	});
});
