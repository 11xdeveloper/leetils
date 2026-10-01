import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignMostRecentlyUsedQueue as MRUQueue } from ".";

describe("1756. Design Most Recently Used Queue", () => {
	it("solves the example from the problem statement", () => {
		const queue = new MRUQueue(8);
		expect(queue.fetch(3)).toBe(3);
		expect(queue.fetch(5)).toBe(6);
		expect(queue.fetch(2)).toBe(2);
		expect(queue.fetch(8)).toBe(2);
	});

	it("matches moving elements of an array on random fetches", () => {
		const random = createRandom(1756);
		for (let run = 0; run < 20; run++) {
			const n = random.int(1, 50);
			const queue = new MRUQueue(n);
			const model = Array.from({ length: n }, (_, i) => i + 1);
			for (let fetch = 0; fetch < 2000; fetch++) {
				const k = random.int(1, n);
				const [value = 0] = model.splice(k - 1, 1);
				model.push(value);
				expect(queue.fetch(k)).toBe(value);
			}
		}
	});
});
