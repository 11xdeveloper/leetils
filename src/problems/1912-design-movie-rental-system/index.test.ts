import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { DesignMovieRentalSystem as MovieRentingSystem } from ".";

describe("1912. Design Movie Rental System", () => {
	it("solves the example from the problem statement", () => {
		const system = new MovieRentingSystem(3, [
			[0, 1, 5],
			[0, 2, 6],
			[0, 3, 7],
			[1, 1, 4],
			[1, 2, 7],
			[2, 1, 5],
		]);
		expect(system.search(1)).toEqual([1, 0, 2]);
		system.rent(0, 1);
		system.rent(1, 2);
		expect(system.report()).toEqual([
			[0, 1],
			[1, 2],
		]);
		system.drop(1, 2);
		expect(system.search(2)).toEqual([0, 1]);
	});

	it("matches sorting every copy on random operations", () => {
		const random = createRandom(1912);
		for (let run = 0; run < 20; run++) {
			const entries: number[][] = [];
			for (let shop = 0; shop < 6; shop++)
				for (let movie = 1; movie <= 3; movie++)
					if (random.int(0, 1)) entries.push([shop, movie, random.int(1, 5)]);
			const system = new MovieRentingSystem(6, entries);
			const rented = new Set<string>();
			const sorted = (list: number[][]) =>
				list.toSorted(
					(a, b) =>
						(a[2] ?? 0) - (b[2] ?? 0) ||
						(a[0] ?? 0) - (b[0] ?? 0) ||
						(a[1] ?? 0) - (b[1] ?? 0),
				);
			for (let op = 0; op < 200; op++) {
				const entry = entries[random.int(0, Math.max(entries.length - 1, 0))];
				const kind = random.int(0, 3);
				if (kind === 0) {
					const movie = random.int(1, 3);
					const expected = sorted(
						entries.filter(([s, m]) => m === movie && !rented.has(`${s},${m}`)),
					)
						.slice(0, 5)
						.map(([s = 0]) => s);
					expect(system.search(movie)).toEqual(expected);
				} else if (
					kind === 1 &&
					entry &&
					!rented.has(`${entry[0]},${entry[1]}`)
				) {
					system.rent(entry[0] ?? 0, entry[1] ?? 0);
					rented.add(`${entry[0]},${entry[1]}`);
				} else if (
					kind === 2 &&
					entry &&
					rented.has(`${entry[0]},${entry[1]}`)
				) {
					system.drop(entry[0] ?? 0, entry[1] ?? 0);
					rented.delete(`${entry[0]},${entry[1]}`);
				} else if (kind === 3) {
					const expected = sorted(
						entries.filter(([s, m]) => rented.has(`${s},${m}`)),
					)
						.slice(0, 5)
						.map(([s = 0, m = 0]) => [s, m]);
					expect(system.report()).toEqual(expected);
				}
			}
		}
	});
});
