/**
 * 1169. Invalid Transactions
 *
 * Each transaction is `"name,time,amount,city"`. One is possibly invalid if
 * its amount is over 1000, or if within 60 minutes of it (inclusive) the
 * same name has a transaction in a different city. Returns the possibly
 * invalid transactions, in input order.
 *
 * Sorts each name's transactions by time and slides a window covering
 * 60 minutes either side of each one, counting the cities in it. A
 * transaction is invalid by city if its window holds more than one city.
 *
 * @see https://leetcode.com/problems/invalid-transactions/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * invalidTransactions(["alice,20,800,mtv", "alice,50,100,beijing"]); // ["alice,20,800,mtv", "alice,50,100,beijing"]
 */
export const invalidTransactions = (
	transactions: readonly string[],
): string[] => {
	const parsed = transactions.map((transaction) => {
		const [name = "", time = "0", amount = "0", city = ""] =
			transaction.split(",");
		return { name, time: Number(time), amount: Number(amount), city };
	});
	const invalid = parsed.map(({ amount }) => amount > 1000);

	const byName = new Map<string, number[]>();
	parsed.forEach(({ name }, i) => {
		const list = byName.get(name);
		if (list) list.push(i);
		else byName.set(name, [i]);
	});
	for (const list of byName.values()) {
		const order = list.sort(
			(a, b) => (parsed[a]?.time ?? 0) - (parsed[b]?.time ?? 0),
		);
		const time = (k: number) => parsed[order[k] ?? 0]?.time ?? 0;
		const city = (k: number) => parsed[order[k] ?? 0]?.city ?? "";
		const cities = new Map<string, number>();
		let [start, end] = [0, 0];
		for (let k = 0; k < order.length; k++) {
			while (end < order.length && time(end) <= time(k) + 60) {
				cities.set(city(end), (cities.get(city(end)) ?? 0) + 1);
				end++;
			}
			while (time(start) < time(k) - 60) {
				const count = (cities.get(city(start)) ?? 0) - 1;
				if (count === 0) cities.delete(city(start));
				else cities.set(city(start), count);
				start++;
			}
			if (cities.size > 1) invalid[order[k] ?? 0] = true;
		}
	}
	return transactions.filter((_, i) => invalid[i]);
};
