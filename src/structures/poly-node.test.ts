import { describe, expect, it } from "bun:test";
import { PolyNode, polyListFromArray, polyListToArray } from "./poly-node";

describe("PolyNode", () => {
	it("defaults to the zero term with no next node", () => {
		const node = new PolyNode();
		expect(node.coefficient).toBe(0);
		expect(node.power).toBe(0);
		expect(node.next).toBeNull();
	});
});

describe("polyListFromArray", () => {
	it("links the terms in order", () => {
		const head = polyListFromArray([
			[5, 3],
			[4, 1],
			[-7, 0],
		]);
		expect(head?.coefficient).toBe(5);
		expect(head?.next?.power).toBe(1);
		expect(head?.next?.next?.coefficient).toBe(-7);
		expect(head?.next?.next?.next).toBeNull();
	});

	it("returns null for an empty array", () => {
		expect(polyListFromArray([])).toBeNull();
	});
});

describe("polyListToArray", () => {
	it("round-trips with polyListFromArray", () => {
		const terms: [number, number][] = [
			[2, 2],
			[4, 1],
			[3, 0],
		];
		expect(polyListToArray(polyListFromArray(terms))).toEqual(terms);
	});

	it("returns an empty array for null", () => {
		expect(polyListToArray(null)).toEqual([]);
	});
});
