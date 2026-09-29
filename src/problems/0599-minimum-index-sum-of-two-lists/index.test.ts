import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumIndexSumOfTwoLists as findRestaurant } from ".";

describe("599. Minimum Index Sum of Two Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findRestaurant(
				["Shogun", "Tapioca Express", "Burger King", "KFC"],
				[
					"Piatti",
					"The Grill at Torrey Pines",
					"Hungry Hunter Steakhouse",
					"Shogun",
				],
			),
		).toEqual(["Shogun"]);
		expect(
			findRestaurant(
				["Shogun", "Tapioca Express", "Burger King", "KFC"],
				["KFC", "Shogun", "Burger King"],
			),
		).toEqual(["Shogun"]);
		expect(
			findRestaurant(["happy", "sad", "good"], ["sad", "happy", "good"]),
		).toEqual(["sad", "happy"]);
	});

	it("matches checking every common string on random inputs", () => {
		const random = createRandom(599);
		for (let run = 0; run < 1000; run++) {
			const pool = ["a", "b", "c", "d", "e", "f"];
			const list1 = pool
				.filter(() => random.int(0, 1) === 1)
				.sort(() => random.next() - 0.5);
			const list2 = pool
				.filter(() => random.int(0, 1) === 1)
				.sort(() => random.next() - 0.5);
			const common = list2.filter((str) => list1.includes(str));
			if (common.length === 0) continue;
			const sums = common.map((str) => list1.indexOf(str) + list2.indexOf(str));
			const least = Math.min(...sums);
			expect(findRestaurant(list1, list2)).toEqual(
				common.filter((_, i) => sums[i] === least),
			);
		}
	});
});
