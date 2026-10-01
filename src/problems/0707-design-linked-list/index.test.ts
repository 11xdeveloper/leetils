import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignLinkedList as MyLinkedList } from ".";

describe("707. Design Linked List", () => {
	it("solves the example from the problem statement", () => {
		const list = new MyLinkedList();
		list.addAtHead(1);
		list.addAtTail(3);
		list.addAtIndex(1, 2);
		expect(list.get(1)).toBe(2);
		list.deleteAtIndex(1);
		expect(list.get(1)).toBe(3);
	});

	it("matches an array on random operations, including out-of-range indices", () => {
		const random = createRandom(707);
		for (let run = 0; run < 100; run++) {
			const list = new MyLinkedList();
			const reference: number[] = [];
			for (let op = 0; op < 100; op++) {
				const index = random.int(-1, reference.length + 1);
				const val = random.int(0, 1000);
				switch (random.int(0, 4)) {
					case 0:
						list.addAtHead(val);
						reference.unshift(val);
						break;
					case 1:
						list.addAtTail(val);
						reference.push(val);
						break;
					case 2:
						list.addAtIndex(index, val);
						if (index >= 0 && index <= reference.length)
							reference.splice(index, 0, val);
						break;
					case 3:
						list.deleteAtIndex(index);
						if (index >= 0 && index < reference.length)
							reference.splice(index, 1);
						break;
					default:
						expect(list.get(index)).toBe(
							index >= 0 && index < reference.length
								? (reference[index] ?? -1)
								: -1,
						);
				}
			}
		}
	});
});
