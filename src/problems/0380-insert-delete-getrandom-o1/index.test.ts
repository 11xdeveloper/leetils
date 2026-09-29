import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { InsertDeleteGetrandomO1 } from ".";

describe("380. Insert Delete GetRandom O(1)", () => {
	it("solves the example from the problem statement", () => {
		const set = new InsertDeleteGetrandomO1();
		expect(set.insert(1)).toBeTrue();
		expect(set.remove(2)).toBeFalse();
		expect(set.insert(2)).toBeTrue();
		expect([1, 2]).toContain(set.getRandom());
		expect(set.remove(1)).toBeTrue();
		expect(set.insert(2)).toBeFalse();
		expect(set.getRandom()).toBe(2);
	});

	it("matches a Set on random operations, only picking members", () => {
		const random = createRandom(380);
		for (let run = 0; run < 100; run++) {
			const set = new InsertDeleteGetrandomO1(random.next);
			const reference = new Set<number>();
			for (let step = 0; step < 100; step++) {
				const value = random.int(0, 9);
				const action = random.int(0, 2);
				if (action === 0) {
					expect(set.insert(value)).toBe(!reference.has(value));
					reference.add(value);
				} else if (action === 1) {
					expect(set.remove(value)).toBe(reference.has(value));
					reference.delete(value);
				} else if (reference.size > 0) {
					expect(reference.has(set.getRandom())).toBeTrue();
				}
			}
		}
	});

	it("picks each element about equally often", () => {
		const random = createRandom(3800);
		const set = new InsertDeleteGetrandomO1(random.next);
		for (const value of [10, 20, 30, 40, 50]) set.insert(value);
		set.remove(30);
		const counts = new Map<number, number>();
		for (let draw = 0; draw < 40_000; draw++) {
			const value = set.getRandom();
			counts.set(value, (counts.get(value) ?? 0) + 1);
		}
		expect([...counts.keys()].toSorted()).toEqual([10, 20, 40, 50]);
		for (const count of counts.values())
			expect(Math.abs(count - 10_000)).toBeLessThan(500);
	});
});
