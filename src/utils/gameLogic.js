// should throw errors based on the discrepencies

export const validateResult = (currLevelData, resultTable) => {
    const expectedResultTable = currLevelData.expectedResult;

    if (expectedResultTable[0].length !== resultTable[0].length) {
        throw new Error(`too ${expectedResultTable[0].length > resultTable[0].length ? 'few' : 'many'} columns in results`);
    }

    // builds expected values hashMaps
    const hashMaps = [];
    for (let x = 0; x < expectedResultTable[0].length; x++) {
        const currMap = {}
        for (let y = 1; y < expectedResultTable.length; y++) {
            currMap[expectedResultTable[y][x]] ? currMap[expectedResultTable[y][x]]++ : currMap[expectedResultTable[y][x]] = 1;
        }
        hashMaps.push(currMap);
    }
        
    for (let x = 0; x < resultTable[0].length; x++) {
        mapLoop : for (const hashMap of hashMaps) {
            if (hashMap.cleared) continue
            const tempMap = structuredClone(hashMap);
            for (let y = 1; y < resultTable.length; y++) {
                if (!tempMap[resultTable[y][x]]) continue mapLoop;
                tempMap[resultTable[y][x]]--;
            }

            const allValuesPresent = Object.values(tempMap).reduce((acc, val) => {
                return acc + val
            }, 0) === 0;

            if (allValuesPresent) {
                hashMap.cleared = true;
            }
        }
    }

    for (const hashMap of hashMaps) {
        if (!hashMap.cleared) return false;
    }

    return true;
}