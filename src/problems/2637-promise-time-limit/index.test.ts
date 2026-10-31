import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "../../testing/clock";
import { promiseTimeLimit } from ".";

describe("2637. Promise Time Limit", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const run = async <A extends unknown[]>(
		fn: (...args: A) => Promise<unknown>,
		args: A,
		t: number,
	) => {
		const clock = new FakeClock();
		let outcome: unknown[] = [];
		promiseTimeLimit(
			fn,
			t,
		)(...args).then(
			(resolved) => {
				outcome = ["resolved", resolved, clock.now];
			},
			(rejected) => {
				outcome = ["rejected", rejected, clock.now];
			},
		);
		await clock.advanceTo(1000);
		return outcome;
	};
	const wait = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	it("solves the examples from the problem statement", async () => {
		const square = async (n: number) => {
			await wait(100);
			return n * n;
		};
		expect(await run(square, [5], 50)).toEqual([
			"rejected",
			"Time Limit Exceeded",
			50,
		]);
		expect(await run(square, [5], 150)).toEqual(["resolved", 25, 100]);
		expect(
			await run(
				async (a: number, b: number) => {
					await wait(120);
					return a + b;
				},
				[5, 10],
				150,
			),
		).toEqual(["resolved", 15, 120]);
		expect(
			await run(
				async () => {
					throw "Error";
				},
				[],
				1000,
			),
		).toEqual(["rejected", "Error", 0]);
	});
});
