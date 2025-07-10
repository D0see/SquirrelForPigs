export const twoDArrToHTMLTable = (tableObj) => {

    const twoDArr = tableObj.table;
    const tableName = tableObj.tableName;

    const table = document.createElement('table');

    // builds caption
    const caption = document.createElement('caption');
    caption.innerText = tableName;
    caption.style.captionSide = 'bottom';
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
    for (const data of twoDArr.slice(1)) {
        const currRow = document.createElement('tr');
        tableBody.appendChild(currRow);
        data.forEach(str => {
           const currStr = document.createElement('td');
           currStr.innerText = str;
           currRow.appendChild(currStr);
        });
    }
    return table;
}

export default {
    twoDArrToHTMLTable,
}