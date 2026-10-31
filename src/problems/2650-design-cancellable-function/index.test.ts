import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { FakeClock } from "../../testing/clock";
import { designCancellableFunction } from ".";

describe("2650. Design Cancellable Function", () => {
	beforeEach(() => jest.useFakeTimers());
	afterEach(() => jest.useRealTimers());

	const run = async (
		generatorFunction: () => Generator<Promise<unknown>, unknown, unknown>,
		cancelledAt: number | null,
	) => {
		const clock = new FakeClock();
		const [cancel, promise] = designCancellableFunction(generatorFunction());
		if (cancelledAt !== null) setTimeout(cancel, cancelledAt);
		let outcome: unknown[] = [];
		promise.then(
			(resolved) => {
				outcome = ["resolved", resolved];
			},
			(rejected) => {
				outcome = ["rejected", rejected];
			},
		);
		await clock.advanceTo(500);
		return outcome;
	};
	const wait = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	it("solves the examples from the problem statement", async () => {
		expect(
			await run(
				// biome-ignore lint/correctness/useYield: the example generator returns at once
				function* () {
					return 42;
				},
				100,
			),
		).toEqual(["resolved", 42]);
		expect(
			await run(function* () {
				const msg = yield new Promise((resolve) => resolve("Hello"));
				throw `Error: ${msg}`;
			}, null),
		).toEqual(["rejected", "Error: Hello"]);
		expect(
			await run(function* () {
				yield wait(200);
				return "Success";
			}, 100),
		).toEqual(["rejected", "Cancelled"]);
		expect(
			await run(function* () {
				let result = 0;
				yield wait(100);
				result += (yield Promise.resolve(1)) as number;
				yield wait(100);
				result += (yield Promise.resolve(1)) as number;
				return result;
			}, null),
		).toEqual(["resolved", 2]);
		expect(
			await run(function* () {
				let result = 0;
				try {
					yield wait(100);
					result += (yield Promise.resolve(1)) as number;
					yield wait(100);
					result += (yield Promise.resolve(1)) as number;
				} catch {
					return result;
				}
				return result;
			}, 150),
		).toEqual(["resolved", 1]);
		expect(
			await run(function* () {
				try {
					yield Promise.reject("Promise Rejected");
				} catch {
					const a = (yield Promise.resolve(2)) as number;
					const b = (yield Promise.resolve(2)) as number;
					return a + b;
				}
			}, null),
		).toEqual(["resolved", 4]);
	});
});
