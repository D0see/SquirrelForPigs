export const findEndOfKeywordQuery = (keywords, words, index) => {
    for (let i = index + 1; i < words.length; i++) {
        if (keywords[words[i]]) {
            return index;
        }
    }
    return words.length - 1
}