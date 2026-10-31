import { describe, expect, it } from "bun:test";
import { arrayPrototypeForeach } from ".";

describe("2804. Array Prototype ForEach", () => {
	it("solves the examples from the problem statement", () => {
		const arr = [1, 2, 3];
		(arrayPrototypeForeach<number>).call(
			arr,
			(value: number, i: number, array: number[]) => {
				array[i] = value * 2;
			},
			{ context: true },
		);
		expect(arr).toEqual([2, 4, 6]);

		const doubled = [true, true, false, false];
		(arrayPrototypeForeach<boolean>).call(
			doubled,
			function (
				this: { context: boolean },
				_: boolean,
				i: number,
				array: boolean[],
			) {
				array[i] = this.context;
			},
			{ context: false },
		);
		expect(doubled).toEqual([false, false, false, false]);
	});
});
