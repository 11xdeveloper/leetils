import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { palindromeLinkedList } from ".";

describe("234. Palindrome Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromeLinkedList(listFromArray([1, 2, 2, 1]))).toBeTrue();
		expect(palindromeLinkedList(listFromArray([1, 2]))).toBeFalse();
	});

	it("handles one node and odd lengths", () => {
		expect(palindromeLinkedList(listFromArray([7]))).toBeTrue();
		expect(palindromeLinkedList(listFromArray([1, 2, 1]))).toBeTrue();
		expect(palindromeLinkedList(listFromArray([1, 2, 3]))).toBeFalse();
	});

	it("matches reversing an array, and leaves the list unchanged, on random inputs", () => {
		const random = createRandom(234);
		for (let run = 0; run < 1000; run++) {
			const half = random.array(random.int(0, 5), 0, 2);
			const values =
				random.int(0, 1) === 0
					? [
							...half,
							...(random.int(0, 1) === 0 ? [random.int(0, 2)] : []),
							...half.toReversed(),
						]
					: random.array(random.int(1, 10), 0, 2);
			if (values.length === 0) continue;
			const head = listFromArray(values);
			expect(palindromeLinkedList(head)).toBe(
				values.join() === values.toReversed().join(),
			);
			expect(listToArray(head)).toEqual(values);
		}
	});
});
