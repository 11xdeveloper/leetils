import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfOrdersInTheBacklog as getNumberOfBacklogOrders } from ".";

/** Processes orders one unit at a time against sorted lists. */
const bySimulation = (orders: number[][]): number => {
	const buys: number[] = [];
	const sells: number[] = [];
	for (const [price = 0, amount = 0, type = 0] of orders) {
		for (let unit = 0; unit < amount; unit++) {
			if (type === 0) {
				const cheapest = Math.min(...sells);
				if (sells.length > 0 && cheapest <= price)
					sells.splice(sells.indexOf(cheapest), 1);
				else buys.push(price);
			} else {
				const highest = Math.max(...buys);
				if (buys.length > 0 && highest >= price)
					buys.splice(buys.indexOf(highest), 1);
				else sells.push(price);
			}
		}
	}
	return buys.length + sells.length;
};

describe("1801. Number of Orders in the Backlog", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getNumberOfBacklogOrders([
				[10, 5, 0],
				[15, 2, 1],
				[25, 1, 1],
				[30, 4, 0],
			]),
		).toBe(6);
		expect(
			getNumberOfBacklogOrders([
				[7, 1000000000, 1],
				[15, 3, 0],
				[5, 999999995, 0],
				[5, 1, 1],
			]),
		).toBe(999999984);
	});

	it("matches trading one unit at a time on random inputs", () => {
		const random = createRandom(1801);
		for (let run = 0; run < 200; run++) {
			const orders = Array.from({ length: random.int(1, 8) }, () => [
				random.int(1, 10),
				random.int(1, 5),
				random.int(0, 1),
			]);
			expect(getNumberOfBacklogOrders(orders)).toBe(bySimulation(orders));
		}
	});
});
