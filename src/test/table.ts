import { RawRow } from "./type"

export const createTableUI = (tableData: RawRow[])=> {
   const head = Object.keys(tableData[0]);
   const $head = head.map(value => `<th>${value}</th>`).join('')
   const $tableHead = `<thead><tr>${$head}</tr></thead>`;
   const createRowUI = (row: RawRow) => head.map(key => `<td>${row[key as keyof typeof row]}</td>`).join('')
   const $body = tableData.map(row => `<tr>${createRowUI(row)}</tr>`).join('')
   const $tableBody = `<tbody>${$body}</tbody>`;
   return `<table>${$tableHead}${$tableBody}</table>`
}
