/**
 * 811. Subdomain Visit Count
 *
 * Each entry of `cpdomains` is `"count domain"`, like
 * `"9001 discuss.leetcode.com"`, and a visit to a domain also counts for
 * each of its parent domains. Returns every domain with its total, as
 * `"count domain"`, in the order each is first seen.
 *
 * Adds each entry's count to the domain and every suffix after a dot.
 *
 * @see https://leetcode.com/problems/subdomain-visit-count/
 * @difficulty Medium
 * @timeComplexity O(total length)
 * @spaceComplexity O(total length)
 *
 * @example
 * subdomainVisitCount(["9001 discuss.leetcode.com"]); // ["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
 */
export const subdomainVisitCount = (cpdomains: readonly string[]): string[] => {
	const counts = new Map<string, number>();
	for (const entry of cpdomains) {
		const [countText = "0", domain = ""] = entry.split(" ");
		const parts = domain.split(".");
		for (let i = 0; i < parts.length; i++) {
			const subdomain = parts.slice(i).join(".");
			counts.set(subdomain, (counts.get(subdomain) ?? 0) + Number(countText));
		}
	}
	return [...counts].map(([domain, count]) => `${count} ${domain}`);
};
