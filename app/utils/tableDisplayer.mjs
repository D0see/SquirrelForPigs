// Nice to see vanilla JS being used for DOM manipulation
// However consider using React if this gets more complex, especially for dynamic updates
// tableObj - bad name, maybe sqlTableWrapper ?
// Could tableType be wrapped in the first parameter?
export const tableObjToHTMLTable = (tableObj, tableType) => {

    // twoDArr - wut is this?
    const twoDArr = tableObj.table;
    const tableName = tableObj.tableName;

    const table = document.createElement('table');
    // don't put tableType in all classes, use a single root class and use CSS inheritance
    table.classList.add(`${tableType}-table`);

    // builds caption
    const caption = document.createElement('caption');
    caption.innerText = tableName;
    caption.classList.add(`${tableType}-caption`);
    table.appendChild(caption);

    // builds thead
    const tableHead = document.createElement('thead');
    tableHead.classList.add(`${tableType}-thead`);
    table.appendChild(tableHead);
    const tableBody = document.createElement('tbody');
    tableBody.classList.add(`${tableType}-tbody`);
    table.appendChild(tableBody);

    // initialises headers
    for (const header of twoDArr[0]) {
        const currHead = document.createElement('th');
        currHead.classList.add(`${tableType}-th`);
        currHead.innerText = header;
        tableHead.appendChild(currHead);
    }

    // initialises data
    // data and str are too vague, consider using more descriptive names like rows and cells 
    for (const data of twoDArr.slice(1)) {
        const currRow = document.createElement('tr');
        currRow.classList.add(`${tableType}-tr`);
        tableBody.appendChild(currRow);
        data.forEach(str => {
            const currStr = document.createElement('td');
            currStr.classList.add(`${tableType}-td`);
            currStr.innerText = str;
            currRow.appendChild(currStr);
        });
    }
    return table;
}
