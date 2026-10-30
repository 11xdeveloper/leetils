import { Heap } from "../../internal/heap";

/**
 * 2353. Design a Food Rating System
 *
 * Tracks foods, their cuisines and ratings; supports changing a rating and
 * finding a cuisine's highest-rated food (smallest name on ties).
 *
 * A heap per cuisine holds (rating, name) records; records whose rating
 * has since changed are dropped lazily.
 *
 * @see https://leetcode.com/problems/design-a-food-rating-system/
 * @difficulty Medium
 * @timeComplexity O(log n) amortised per operation
 * @spaceComplexity O(n + changes)
 *
 * @example
 * const ratings = new DesignAFoodRatingSystem(["kimchi", "ramen"], ["korean", "japanese"], [9, 14]);
 * ratings.highestRated("korean"); // "kimchi"
 */
export class DesignAFoodRatingSystem {
	readonly #rating = new Map<string, number>();
	readonly #cuisine = new Map<string, string>();
	readonly #best = new Map<string, Heap<[rating: number, food: string]>>();

	constructor(
		foods: readonly string[],
		cuisines: readonly string[],
		ratings: readonly number[],
	) {
		for (const [i, food] of foods.entries()) {
			this.#cuisine.set(food, cuisines[i] ?? "");
			this.changeRating(food, ratings[i] ?? 0);
		}
	}

	changeRating(food: string, newRating: number): void {
		this.#rating.set(food, newRating);
		const cuisine = this.#cuisine.get(food) ?? "";
		let heap = this.#best.get(cuisine);
		if (!heap) {
			heap = new Heap<[number, string]>(
				(a, b) => b[0] - a[0] || (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0),
			);
			this.#best.set(cuisine, heap);
		}
		heap.push([newRating, food]);
	}

	highestRated(cuisine: string): string {
		const heap = this.#best.get(cuisine);
		for (let top = heap?.peek(); top; top = heap?.peek()) {
			if (this.#rating.get(top[1]) === top[0]) return top[1];
			heap?.pop();
		}
		return "";
	}
}
