import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "../../testing/clock";
import { executeAsynchronousFunctionsInParallel } from ".";

describe("2721. Execute Asynchronous Functions in Parallel", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const delayed =
		(value: number, ms: number, fail = false) =>
		() =>
			new Promise<number>((resolve, reject) =>
				setTimeout(
					() => (fail ? reject(`Error ${value}`) : resolve(value)),
					ms,
				),
			);

	const run = async (functions: (() => Promise<number>)[]) => {
		const clock = new FakeClock();
		let outcome: unknown[] = [];
		executeAsynchronousFunctionsInParallel(functions).then(
			(resolved) => {
				outcome = ["resolved", resolved, clock.now];
			},
			(rejected) => {
				outcome = ["rejected", rejected, clock.now];
			},
		);
		await clock.advanceTo(500);
		return outcome;
	};

	it("solves the examples from the problem statement", async () => {
		expect(await run([delayed(5, 200)])).toEqual(["resolved", [5], 200]);
		expect(await run([delayed(1, 200), delayed(2, 100, true)])).toEqual([
			"rejected",
			"Error 2",
			100,
		]);
		expect(
			await run([delayed(4, 50), delayed(10, 150), delayed(16, 100)]),
		).toEqual(["resolved", [4, 10, 16], 150]);
	});

	it("resolves at once with no functions", async () => {
		expect(await run([])).toEqual(["resolved", [], 0]);
	});
});
