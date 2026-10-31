import { describe, expect, it } from "bun:test";
import { makeObjectImmutable } from ".";

const thrown = (fn: () => unknown): unknown => {
	try {
		fn();
	} catch (error) {
		return error;
	}
	return undefined;
};

describe("2692. Make Object Immutable", () => {
	it("solves the examples from the problem statement", () => {
		const a = makeObjectImmutable({ x: 5 });
		expect(
			thrown(() => {
				a.x = 5;
			}),
		).toBe("Error Modifying: x");

		const b = makeObjectImmutable({ arr: [1, 2, 3] });
		expect(
			thrown(() => {
				b.arr[1] = {} as number;
			}),
		).toBe("Error Modifying Index: 1");

		const c = makeObjectImmutable({ obj: { val: { x: 10, y: 20 } } });
		expect(
			thrown(() => {
				c.obj.val.x = 20;
			}),
		).toBe("Error Modifying: x");

		const d = makeObjectImmutable({ arr: [1, 2, 3] });
		expect(thrown(() => d.arr.push(4))).toBe("Error Calling Method: push");
	});

	it("still reads and leaves the object as it was", () => {
		const original = { list: [3, 1, 2], nested: { deep: [{ v: 1 }] } };
		const object = makeObjectImmutable(original);
		expect(object.list.length).toBe(3);
		expect(object.list.map((n) => n * 2)).toEqual([6, 2, 4]);
		expect(object.nested.deep[0]?.v).toBe(1);
		expect(object.nested).toBe(object.nested);
		expect(thrown(() => object.list.sort())).toBe("Error Calling Method: sort");
		expect(
			thrown(() => {
				delete (object.nested as { deep?: unknown }).deep;
			}),
		).toBe("Error Modifying: deep");
		expect(original).toEqual({ list: [3, 1, 2], nested: { deep: [{ v: 1 }] } });
	});
});
