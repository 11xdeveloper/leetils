import { describe, expect, it } from "bun:test";
import { memoizeII } from ".";

describe("2630. Memoize II", () => {
	it("solves the examples from the problem statement", () => {
		let calls = 0;
		const add = memoizeII((a: number, b: number) => {
			calls++;
			return a + b;
		});
		expect([add(2, 2), add(2, 2), add(1, 2)]).toEqual([4, 4, 3]);
		expect(calls).toBe(2);

		calls = 0;
		const merge = memoizeII((a: object, b: object) => {
			calls++;
			return { ...a, ...b };
		});
		expect(merge({}, {})).toEqual({});
		expect(merge({}, {})).toEqual({});
		expect(merge({}, {})).toEqual({});
		expect(calls).toBe(3);

		calls = 0;
		const o = {};
		const merged = memoizeII((a: object, b: object) => {
			calls++;
			return { ...a, ...b };
		});
		merged(o, o);
		merged(o, o);
		merged(o, o);
		expect(calls).toBe(1);
	});

	it("caches undefined results and prefixes separately", () => {
		let calls = 0;
		const f = memoizeII((...args: unknown[]) => {
			calls++;
			return args.length === 1 ? undefined : args.length;
		});
		expect(f(1)).toBeUndefined();
		expect(f(1)).toBeUndefined();
		expect(f(1, 2)).toBe(2);
		expect(f()).toBe(0);
		expect(f("1")).toBeUndefined();
		expect(calls).toBe(4);
	});
});
