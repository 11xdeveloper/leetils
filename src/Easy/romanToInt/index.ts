import { RomanNumeral, RomanNumerals } from '../../constants';

export default (roman: string) => {
    let result = 0;

    for (let i = 0; i < roman.length; i++) {
        const val = RomanNumerals[roman[i] as RomanNumeral];
        const next = RomanNumerals[roman[i + 1] as RomanNumeral] ?? 0;

        result = val >= next ? result + val : result - val;
    }

    return result;
};
