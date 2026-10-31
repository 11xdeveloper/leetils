import { describe, expect, it } from "bun:test";
import { callFunctionWithCustomContext } from ".";

const callPolyfill = (
	fn: (...args: never[]) => unknown,
	context: object,
	...args: unknown[]
) => Reflect.apply(callFunctionWithCustomContext, fn, [context, ...args]);

describe("2693. Call Function with Custom Context", () => {
	it("solves the examples from the problem statement", () => {
		function increment(this: { count: number }) {
			this.count++;
			return this.count;
		}
		expect(callPolyfill(increment, { count: 1 })).toBe(2);

		function tax(this: { item: string }, price: number, taxRate: number) {
			return `The cost of the ${this.item} is ${price * taxRate}`;
		}
		expect(callPolyfill(tax, { item: "burger" }, 10, 1.1)).toBe(
			"The cost of the burger is 11",
		);
	});

	it("leaves no trace on the context", () => {
		const context = { a: 1 };
		callPolyfill(function (this: object) {
			return Object.keys(this);
		}, context);
		expect(Reflect.ownKeys(context)).toEqual(["a"]);
	});
});
