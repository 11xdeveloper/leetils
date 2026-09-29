import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { plusOne } from "../0066-plus-one";
import { plusOneLinkedList } from ".";

const increment = (digits: number[]): number[] =>
	listToArray(plusOneLinkedList(listFromArray(digits)));

describe("369. Plus One Linked List", () => {
	it("solves the examples from the problem statement", () => {
		expect(increment([1, 2, 3])).toEqual([1, 2, 4]);
		expect(increment([0])).toEqual([1]);
	});

	it("carries through trailing 9s and adds a new digit when all are 9", () => {
		expect(increment([1, 9, 9])).toEqual([2, 0, 0]);
		expect(increment([9, 9])).toEqual([1, 0, 0]);
	});

	it("matches Plus One on random numbers", () => {
		const random = createRandom(369);
		for (let run = 0; run < 500; run++) {
			const digits = [
				random.int(1, 9),
				...random.array(random.int(0, 8), 7, 9),
			];
			expect(increment(digits)).toEqual(plusOne(digits));
		}
	});
});
