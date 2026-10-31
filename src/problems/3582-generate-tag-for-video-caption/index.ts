/**
 * 3582. Generate Tag for Video Caption
 *
 * Makes a tag from a caption: `#`, then the words in camelCase (first word
 * lowercase, later ones capitalised), keeping only letters and cut to 100
 * characters.
 *
 * @see https://leetcode.com/problems/generate-tag-for-video-caption/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * generateTagForVideoCaption("Leetcode daily streak achieved"); // "#leetcodeDailyStreakAchieved"
 */
export const generateTagForVideoCaption = (caption: string): string => {
	const words = caption
		.split(" ")
		.map((word) => word.replace(/[^a-zA-Z]/g, "").toLowerCase())
		.filter((word) => word.length > 0);
	const camel = words
		.map((word, i) =>
			i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
		)
		.join("");
	return `#${camel}`.slice(0, 100);
};
