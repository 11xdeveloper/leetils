import { describe, expect, it } from "bun:test";
import { createRandom } from "../testing/random";
import { Heap } from "./heap";

describe("Heap", () => {
	it("pops items in the order of the comparison", () => {
		const heap = new Heap<number>((a, b) => a - b, [5, 1, 4, 2, 3]);
		expect(heap.size).toBe(5);
		expect(heap.peek()).toBe(1);
		expect([
			heap.pop(),
			heap.pop(),
			heap.pop(),
			heap.pop(),
			heap.pop(),
		]).toEqual([1, 2, 3, 4, 5]);
		expect(heap.pop()).toBeUndefined();
		expect(heap.size).toBe(0);
	});

	it("works as a max-heap with a reversed comparison", () => {
		const heap = new Heap<number>((a, b) => b - a, [5, 1, 4]);
		expect(heap.pop()).toBe(5);
		expect(heap.pop()).toBe(4);
	});

	it("matches sorting when pushes and pops are interleaved", () => {
		const random = createRandom(1);
		for (let run = 0; run < 200; run++) {
			const heap = new Heap<number>((a, b) => a - b);
			const reference: number[] = [];
			for (let step = 0; step < 50; step++) {
				if (random.int(0, 2) > 0) {
					const value = random.int(-20, 20);
					heap.push(value);
					reference.push(value);
					reference.sort((a, b) => a - b);
				} else {
					expect(heap.pop()).toBe(reference.shift());
				}
				expect(heap.size).toBe(reference.length);
			}
		}
	});
});
