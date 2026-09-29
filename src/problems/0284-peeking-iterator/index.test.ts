import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { PeekingIterator } from ".";

const iteratorOver = (values: number[]) => {
	let i = 0;
	return { hasNext: () => i < values.length, next: () => values[i++] ?? 0 };
};

describe("284. Peeking Iterator", () => {
	it("solves the example from the problem statement", () => {
		const iterator = new PeekingIterator(iteratorOver([1, 2, 3]));
		expect(iterator.next()).toBe(1);
		expect(iterator.peek()).toBe(2);
		expect(iterator.next()).toBe(2);
		expect(iterator.next()).toBe(3);
		expect(iterator.hasNext()).toBeFalse();
	});

	it("handles an empty iterator", () => {
		expect(new PeekingIterator(iteratorOver([])).hasNext()).toBeFalse();
	});

	it("matches an array index on random calls", () => {
		const random = createRandom(284);
		for (let run = 0; run < 300; run++) {
			const values = random.array(random.int(0, 10), -9, 9);
			const iterator = new PeekingIterator(iteratorOver(values));
			let position = 0;
			while (position < values.length) {
				expect(iterator.hasNext()).toBeTrue();
				if (random.int(0, 1) === 0)
					expect(iterator.peek()).toBe(values[position] ?? 0);
				else expect(iterator.next()).toBe(values[position++] ?? 0);
			}
			expect(iterator.hasNext()).toBeFalse();
		}
	});
});
