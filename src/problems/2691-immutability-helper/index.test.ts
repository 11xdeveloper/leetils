import { describe, expect, it } from "bun:test";
import { ImmutabilityHelper } from ".";

describe("2691. Immutability Helper", () => {
	it("solves the examples from the problem statement", () => {
		const counter = new ImmutabilityHelper({ val: 10 });
		expect(
			counter.produce((proxy) => {
				proxy.val += 1;
			}),
		).toEqual({ val: 11 });
		expect(
			counter.produce((proxy) => {
				proxy.val -= 1;
			}),
		).toEqual({ val: 9 });

		const list = new ImmutabilityHelper<{ arr: number[]; newVal?: number }>({
			arr: [1, 2, 3],
		});
		expect(
			list.produce((proxy) => {
				proxy.arr[0] = 5;
				proxy.newVal = (proxy.arr[0] ?? 0) + (proxy.arr[1] ?? 0);
			}),
		).toEqual({ arr: [5, 2, 3], newVal: 7 });

		const nested = new ImmutabilityHelper({ obj: { val: { x: 10, y: 20 } } });
		expect(
			nested.produce((proxy) => {
				const data = proxy.obj.val;
				const temp = data.x;
				data.x = data.y;
				data.y = temp;
			}),
		).toEqual({ obj: { val: { x: 20, y: 10 } } });
	});

	it("leaves the original alone and shares unchanged parts", () => {
		const original = { a: { b: [1, 2] }, c: { d: 1 } };
		const helper = new ImmutabilityHelper(original);
		const result = helper.produce((proxy) => {
			proxy.a.b.push(3);
			expect(proxy.c.d).toBe(1);
		});
		expect(result).toEqual({ a: { b: [1, 2, 3] }, c: { d: 1 } });
		expect(original).toEqual({ a: { b: [1, 2] }, c: { d: 1 } });
		expect(result.c).toBe(original.c);
		expect(helper.produce(() => {})).toBe(original);
	});

	it("handles moved subobjects, deletes and reads after writes", () => {
		const original: { a?: { x: number }; b?: { x: number } } = { a: { x: 1 } };
		const result = new ImmutabilityHelper(original).produce((proxy) => {
			if (proxy.a) proxy.a.x = 2;
			if (proxy.a) proxy.b = proxy.a;
			delete proxy.a;
			expect(Object.keys(proxy)).toEqual(["b"]);
		});
		expect(result).toEqual({ b: { x: 2 } });
		expect(original).toEqual({ a: { x: 1 } });
	});
});
