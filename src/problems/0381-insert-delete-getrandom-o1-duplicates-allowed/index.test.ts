import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { InsertDeleteGetrandomO1DuplicatesAllowed as Collection } from ".";

describe("381. Insert Delete GetRandom O(1) - Duplicates allowed", () => {
	it("solves the example from the problem statement", () => {
		const collection = new Collection();
		expect(collection.insert(1)).toBeTrue();
		expect(collection.insert(1)).toBeFalse();
		expect(collection.insert(2)).toBeTrue();
		expect([1, 2]).toContain(collection.getRandom());
		expect(collection.remove(1)).toBeTrue();
		expect([1, 2]).toContain(collection.getRandom());
	});

	it("matches a list of copies on random operations", () => {
		const random = createRandom(381);
		for (let run = 0; run < 100; run++) {
			const collection = new Collection(random.next);
			const reference: number[] = [];
			for (let step = 0; step < 100; step++) {
				const value = random.int(0, 5);
				const action = random.int(0, 2);
				if (action === 0) {
					expect(collection.insert(value)).toBe(!reference.includes(value));
					reference.push(value);
				} else if (action === 1) {
					const index = reference.indexOf(value);
					expect(collection.remove(value)).toBe(index !== -1);
					if (index !== -1) reference.splice(index, 1);
				} else if (reference.length > 0) {
					expect(reference).toContain(collection.getRandom());
				}
			}
		}
	});

	it("picks values in proportion to their copies", () => {
		const collection = new Collection(createRandom(3810).next);
		for (const value of [1, 1, 1, 2, 3, 3]) collection.insert(value);
		collection.remove(3);
		const counts = new Map<number, number>();
		for (let draw = 0; draw < 50_000; draw++) {
			const value = collection.getRandom();
			counts.set(value, (counts.get(value) ?? 0) + 1);
		}
		expect(Math.abs((counts.get(1) ?? 0) - 30_000)).toBeLessThan(800);
		expect(Math.abs((counts.get(2) ?? 0) - 10_000)).toBeLessThan(500);
		expect(Math.abs((counts.get(3) ?? 0) - 10_000)).toBeLessThan(500);
	});
});
