import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignCircularDeque as MyCircularDeque } from ".";

describe("641. Design Circular Deque", () => {
	it("solves the example from the problem statement", () => {
		const deque = new MyCircularDeque(3);
		expect(deque.insertLast(1)).toBeTrue();
		expect(deque.insertLast(2)).toBeTrue();
		expect(deque.insertFront(3)).toBeTrue();
		expect(deque.insertFront(4)).toBeFalse();
		expect(deque.getRear()).toBe(2);
		expect(deque.isFull()).toBeTrue();
		expect(deque.deleteLast()).toBeTrue();
		expect(deque.insertFront(4)).toBeTrue();
		expect(deque.getFront()).toBe(4);
	});

	it("matches an array on random operations", () => {
		const random = createRandom(641);
		for (let run = 0; run < 100; run++) {
			const k = random.int(1, 5);
			const deque = new MyCircularDeque(k);
			const reference: number[] = [];
			for (let op = 0; op < 100; op++) {
				const value = random.int(0, 1000);
				switch (random.int(0, 7)) {
					case 0:
						expect(deque.insertFront(value)).toBe(reference.length < k);
						if (reference.length < k) reference.unshift(value);
						break;
					case 1:
						expect(deque.insertLast(value)).toBe(reference.length < k);
						if (reference.length < k) reference.push(value);
						break;
					case 2:
						expect(deque.deleteFront()).toBe(reference.length > 0);
						reference.shift();
						break;
					case 3:
						expect(deque.deleteLast()).toBe(reference.length > 0);
						reference.pop();
						break;
					case 4:
						expect(deque.getFront()).toBe(reference[0] ?? -1);
						break;
					case 5:
						expect(deque.getRear()).toBe(reference.at(-1) ?? -1);
						break;
					default:
						expect(deque.isEmpty()).toBe(reference.length === 0);
						expect(deque.isFull()).toBe(reference.length === k);
				}
			}
		}
	});
});
