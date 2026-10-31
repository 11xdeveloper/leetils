import { describe, expect, it } from "bun:test";
import { bindFunctionToContext } from ".";

const bindPolyfill = (fn: (...args: never[]) => unknown, obj: object) =>
	Reflect.apply(bindFunctionToContext, fn, [obj]) as (
		...args: unknown[]
	) => unknown;

describe("2754. Bind Function to Context", () => {
	it("solves the examples from the problem statement", () => {
		function f(this: { item: string }) {
			return `My context is ${this.item}`;
		}
		expect(bindPolyfill(f, { item: "burger" })()).toBe("My context is burger");

		function g(this: { a: number }, multiplier: number) {
			return this.a * multiplier;
		}
		expect(bindPolyfill(g, { a: 5 })(10)).toBe(50);

		function h(this: { item: string }) {
			return this.item;
		}
		expect(bindPolyfill(h, { item: "burger" })()).toBe("burger");
	});
});
