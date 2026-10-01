/**
 * 332. Reconstruct Itinerary
 *
 * Given airline tickets `[from, to]`, returns the itinerary that starts at
 * `"JFK"` and uses every ticket exactly once. When several exist, returns
 * the one that comes first in lexical order. At least one always exists.
 *
 * The itinerary is an Eulerian path through the tickets. Hierholzer's
 * algorithm finds one: always fly to the lexically smallest remaining
 * destination, and when stuck, add the airport to the front of the route
 * and back up. Getting stuck early only happens at a dead end, which then
 * correctly ends up last. It runs with an explicit stack.
 *
 * @see https://leetcode.com/problems/reconstruct-itinerary/
 * @difficulty Hard
 * @timeComplexity O(e log e) where e is the number of tickets
 * @spaceComplexity O(e)
 *
 * @example
 * reconstructItinerary([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]); // ["JFK", "MUC", "LHR", "SFO", "SJC"]
 */
export const reconstructItinerary = (
	tickets: readonly (readonly string[])[],
): string[] => {
	// Destinations sorted in reverse, so the smallest is popped first.
	const flights = new Map<string, string[]>();
	for (const [from = "", to = ""] of tickets)
		flights.set(from, [...(flights.get(from) ?? []), to]);
	for (const destinations of flights.values()) destinations.sort().reverse();

	const route: string[] = [];
	const stack = ["JFK"];
	while (stack.length > 0) {
		const next = flights.get(stack.at(-1) ?? "")?.pop();
		if (next) stack.push(next);
		else route.push(stack.pop() ?? "");
	}

	return route.reverse();
};
