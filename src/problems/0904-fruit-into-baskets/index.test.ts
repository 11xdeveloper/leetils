import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fruitIntoBaskets as totalFruit } from ".";

describe("904. Fruit Into Baskets", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalFruit([1, 2, 1])).toBe(3);
		expect(totalFruit([0, 1, 2, 2])).toBe(3);
		expect(totalFruit([1, 2, 3, 2, 2])).toBe(4);
	});

	it("matches checking every subarray on random rows", () => {
		const random = createRandom(904);
		for (let run = 0; run < 1000; run++) {
			const fruits = random.array(random.int(1, 15), 0, 4);
			let expected = 0;
			for (let i = 0; i < fruits.length; i++)
				for (let j = i + 1; j <= fruits.length; j++)
					if (new Set(fruits.slice(i, j)).size <= 2)
						expected = Math.max(expected, j - i);
			expect(totalFruit(fruits)).toBe(expected);
		}
	});
});
