import { describe, expect, it } from "bun:test";
import { listFromArray } from "../../structures/list-node";
import { winnerOfTheLinkedListGame as gameResult } from ".";

describe("3062. Winner of the Linked List Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(gameResult(listFromArray([2, 1]))).toBe("Even");
		expect(gameResult(listFromArray([2, 5, 4, 7, 20, 5]))).toBe("Odd");
		expect(gameResult(listFromArray([4, 5, 2, 1]))).toBe("Tie");
	});
});
