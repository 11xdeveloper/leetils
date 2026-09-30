import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { FirstUniqueNumber as FirstUnique } from ".";

describe("1429. First Unique Number", () => {
	it("solves the examples from the problem statement", () => {
		const first = new FirstUnique([2, 3, 5]);
		expect(first.showFirstUnique()).toBe(2);
		first.add(5);
		expect(first.showFirstUnique()).toBe(2);
		first.add(2);
		expect(first.showFirstUnique()).toBe(3);
		first.add(3);
		expect(first.showFirstUnique()).toBe(-1);

		const second = new FirstUnique([7, 7, 7, 7, 7, 7]);
		expect(second.showFirstUnique()).toBe(-1);
		for (const value of [7, 3, 3, 7, 17]) second.add(value);
		expect(second.showFirstUnique()).toBe(17);

		const third = new FirstUnique([809]);
		expect(third.showFirstUnique()).toBe(809);
		third.add(809);
		expect(third.showFirstUnique()).toBe(-1);
	});

	it("matches scanning the whole queue on random operations", () => {
		const random = createRandom(1429);
		for (let run = 0; run < 100; run++) {
			const queue = random.array(random.int(1, 5), 1, 6);
			const first = new FirstUnique(queue);
			for (let op = 0; op < 30; op++) {
				if (random.next() < 0.5) {
					const value = random.int(1, 6);
					first.add(value);
					queue.push(value);
				} else {
					const unique = queue.find(
						(v) => queue.indexOf(v) === queue.lastIndexOf(v),
					);
					expect(first.showFirstUnique()).toBe(unique ?? -1);
				}
			}
		}
	});
});
