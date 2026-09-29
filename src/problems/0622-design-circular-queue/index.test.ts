import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignCircularQueue as MyCircularQueue } from ".";

describe("622. Design Circular Queue", () => {
	it("solves the example from the problem statement", () => {
		const queue = new MyCircularQueue(3);
		expect(queue.enQueue(1)).toBeTrue();
		expect(queue.enQueue(2)).toBeTrue();
		expect(queue.enQueue(3)).toBeTrue();
		expect(queue.enQueue(4)).toBeFalse();
		expect(queue.Rear()).toBe(3);
		expect(queue.isFull()).toBeTrue();
		expect(queue.deQueue()).toBeTrue();
		expect(queue.enQueue(4)).toBeTrue();
		expect(queue.Rear()).toBe(4);
	});

	it("matches an array on random operations", () => {
		const random = createRandom(622);
		for (let run = 0; run < 100; run++) {
			const k = random.int(1, 5);
			const queue = new MyCircularQueue(k);
			const reference: number[] = [];
			for (let op = 0; op < 100; op++) {
				const action = random.int(0, 5);
				if (action <= 1) {
					const value = random.int(0, 1000);
					expect(queue.enQueue(value)).toBe(reference.length < k);
					if (reference.length < k) reference.push(value);
				} else if (action === 2) {
					expect(queue.deQueue()).toBe(reference.length > 0);
					reference.shift();
				} else if (action === 3) {
					expect(queue.Front()).toBe(reference[0] ?? -1);
				} else if (action === 4) {
					expect(queue.Rear()).toBe(reference.at(-1) ?? -1);
				} else {
					expect(queue.isEmpty()).toBe(reference.length === 0);
					expect(queue.isFull()).toBe(reference.length === k);
				}
			}
		}
	});
});
