export const tableObjToHTMLTable = (tableObj, tableType) => {

    const twoDArr = tableObj.table;
    const tableName = tableObj.tableName;

    const tableContainer = document.createElement('div');
    tableContainer.classList.add(`${tableType}`);
    const table = document.createElement('table');
    tableContainer.appendChild(table);

    // builds caption
    const caption = document.createElement('caption');
    caption.innerText = tableName;

    table.appendChild(caption);

    // builds thead
    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    // initialises headers
    for (const header of twoDArr[0]) {
        const currHead = document.createElement('th');    
        currHead.innerText = header;
        tableHead.appendChild(currHead);
    }

    // initialises data
    for (const row of twoDArr.slice(1)) {
        const currRow = document.createElement('tr')    
        tableBody.appendChild(currRow);
        row.forEach(cellData => {
            const htmlCell = document.createElement('td');
        htmlCell.innerText = cellData;
            currRow.appendChild(htmlCell);
        });
    }
    return tableContainer;
}
