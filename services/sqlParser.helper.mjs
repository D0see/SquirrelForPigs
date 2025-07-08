export const findEndIndexOfKeywordQuery = (keywords, words, index) => {
    for (let i = index + 2; i < words.length; i++) {
        if (keywords[words[i]]) {
            return i - 1;
        }
    }
    return words.length - 1
}