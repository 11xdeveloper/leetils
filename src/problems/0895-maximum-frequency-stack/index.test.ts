import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MaximumFrequencyStack as FreqStack } from ".";

describe("895. Maximum Frequency Stack", () => {
	it("solves the example from the problem statement", () => {
		const stack = new FreqStack();
		for (const val of [5, 7, 5, 7, 4, 5]) stack.push(val);
		expect([stack.pop(), stack.pop(), stack.pop(), stack.pop()]).toEqual([
			5, 7, 5, 4,
		]);
	});

	it("matches scanning an array on random operations", () => {
		const random = createRandom(895);
		for (let run = 0; run < 200; run++) {
			const stack = new FreqStack();
			const pushed: number[] = [];
			for (let op = 0; op < 60; op++) {
				if (pushed.length === 0 || random.int(0, 2) > 0) {
					const val = random.int(0, 4);
					stack.push(val);
					pushed.push(val);
					continue;
				}
				const counts = new Map<number, number>();
				for (const val of pushed) counts.set(val, (counts.get(val) ?? 0) + 1);
				const most = Math.max(...counts.values());
				const index = pushed.findLastIndex((val) => counts.get(val) === most);
				expect(stack.pop()).toBe(pushed[index] ?? -1);
				pushed.splice(index, 1);
			}
		}
	});
});
