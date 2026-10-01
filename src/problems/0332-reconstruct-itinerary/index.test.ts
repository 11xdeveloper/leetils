import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reconstructItinerary } from ".";

/** Depth-first search over tickets in lexical order; the first full itinerary found is the smallest. */
const bySearch = (tickets: string[][]): string[] | undefined => {
	const sorted = tickets.toSorted((a, b) =>
		(a[1] ?? "") < (b[1] ?? "") ? -1 : 1,
	);
	const used = sorted.map(() => false);
	const route = ["JFK"];
	const search = (): boolean => {
		if (route.length === sorted.length + 1) return true;
		for (const [i, [from, to = ""]] of sorted.entries()) {
			if (used[i] || from !== route.at(-1)) continue;
			used[i] = true;
			route.push(to);
			if (search()) return true;
			route.pop();
			used[i] = false;
		}
		return false;
	};
	return search() ? route : undefined;
};

describe("332. Reconstruct Itinerary", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			reconstructItinerary([
				["MUC", "LHR"],
				["JFK", "MUC"],
				["SFO", "SJC"],
				["LHR", "SFO"],
			]),
		).toEqual(["JFK", "MUC", "LHR", "SFO", "SJC"]);
		expect(
			reconstructItinerary([
				["JFK", "SFO"],
				["JFK", "ATL"],
				["SFO", "ATL"],
				["ATL", "JFK"],
				["ATL", "SFO"],
			]),
		).toEqual(["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]);
	});

	it("takes a lexically larger flight first when the smaller one is a dead end", () => {
		expect(
			reconstructItinerary([
				["JFK", "KUL"],
				["JFK", "NRT"],
				["NRT", "JFK"],
			]),
		).toEqual(["JFK", "NRT", "JFK", "KUL"]);
	});

	it("matches a lexical depth-first search on random itineraries", () => {
		const random = createRandom(332);
		const airports = ["AAA", "BBB", "CCC", "JFK"];
		for (let run = 0; run < 300; run++) {
			// Generate a random walk from JFK, then shuffle its tickets.
			const walk = ["JFK"];
			for (let i = random.int(1, 7); i > 0; i--)
				walk.push(airports[random.int(0, 3)] ?? "AAA");
			const tickets = walk
				.slice(1)
				.map((to, i) => [walk[i] ?? "", to])
				.toSorted(() => random.next() - 0.5);
			expect(reconstructItinerary(tickets)).toEqual(bySearch(tickets) ?? []);
		}
	});
});
