export const twoDArrToHTMLTable = (twoDArr) => {
    const table = document.createElement('table');
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
