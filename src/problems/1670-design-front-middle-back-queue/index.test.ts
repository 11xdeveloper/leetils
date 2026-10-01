import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignFrontMiddleBackQueue as FrontMiddleBackQueue } from ".";

describe("1670. Design Front Middle Back Queue", () => {
	it("solves the example from the problem statement", () => {
		const queue = new FrontMiddleBackQueue();
		queue.pushFront(1);
		queue.pushBack(2);
		queue.pushMiddle(3);
		queue.pushMiddle(4);
		expect(queue.popFront()).toBe(1);
		expect(queue.popMiddle()).toBe(3);
		expect(queue.popMiddle()).toBe(4);
		expect(queue.popBack()).toBe(2);
		expect(queue.popFront()).toBe(-1);
	});

	it("matches an array with splice on random operations", () => {
		const random = createRandom(1670);
		for (let run = 0; run < 50; run++) {
			const queue = new FrontMiddleBackQueue();
			const model: number[] = [];
			for (let op = 0; op < 200; op++) {
				const val = random.int(1, 100);
				switch (random.int(0, 5)) {
					case 0:
						queue.pushFront(val);
						model.unshift(val);
						break;
					case 1:
						queue.pushMiddle(val);
						model.splice(Math.floor(model.length / 2), 0, val);
						break;
					case 2:
						queue.pushBack(val);
						model.push(val);
						break;
					case 3:
						expect(queue.popFront()).toBe(model.shift() ?? -1);
						break;
					case 4:
						expect(queue.popMiddle()).toBe(
							model.length
								? (model.splice(Math.floor((model.length - 1) / 2), 1)[0] ?? -1)
								: -1,
						);
						break;
					default:
						expect(queue.popBack()).toBe(model.pop() ?? -1);
				}
			}
		}
	});
});
