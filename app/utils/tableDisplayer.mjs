export const twoDArrToHTMLTable = (tableObj, tableType) => {

    const twoDArr = tableObj.table;
    const tableName = tableObj.tableName;

    const table = document.createElement('table');
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
