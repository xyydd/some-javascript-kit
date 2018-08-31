/* eslint-disable */
require('script-loader!file-saver')
require('script-loader!vendor/Blob')
require('script-loader!xlsx/dist/xlsx.core.min')
function generateArray(table) {
    let out = []
    let rows = table.querySelectorAll('tr')
    let ranges = []
    for (let R = 0; R < rows.length; ++R) {
        let outRow = []
        let row = rows[R]
        let columns = row.querySelectorAll('td')
        for (let C = 0; C < columns.length; ++C) {
            let cell = columns[C]
            let colspan = cell.getAttribute('colspan')
            let rowspan = cell.getAttribute('rowspan')
            let cellValue = cell.innerText
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue

            //Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null)
                }
            })

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1
                colspan = colspan || 1
                ranges.push({s: {r: R, c: outRow.length}, e: {r: R + rowspan - 1, c: outRow.length + colspan - 1}})
            }
            

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null)

            //Handle Colspan
            if (colspan) for (let k = 0; k < colspan - 1; ++k) outRow.push(null)
        }
        out.push(outRow)
    }
    return [out, ranges]
}

function datenum(v, date1904) {
    if (date1904) v += 1462
    let epoch = Date.parse(v)
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data, opts) {
    let ws = {}
    let range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}}
    for (let R = 0; R != data.length; ++R) {
        for (let C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R
            if (range.s.c > C) range.s.c = C
            if (range.e.r < R) range.e.r = R
            if (range.e.c < C) range.e.c = C
            let cell = {v: data[R][C]}
            if (cell.v == null) continue
            let cell_ref = XLSX.utils.encode_cell({c: C, r: R})

            if (typeof cell.v === 'number') cell.t = 'n'
            else if (typeof cell.v === 'boolean') cell.t = 'b'
            else if (cell.v instanceof Date) {
                cell.t = 'n'
                cell.z = XLSX.SSF._table[14]
                cell.v = datenum(cell.v)
            }
            else cell.t = 's'

            ws[cell_ref] = cell
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
    return ws
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook()
    this.SheetNames = []
    this.Sheets = {}
}

function s2ab(s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
}

export function export_table_to_excel(id) {
    let theTable = document.getElementById(id)
    console.log('a')
    let oo = generateArray(theTable)
    let ranges = oo[1]

    /* original data */
    let data = oo[0]
    let ws_name = "SheetJS"
    console.log(data)

    let wb = new Workbook(), ws = sheet_from_array_of_arrays(data)

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan']
    ws['!merges'] = ranges

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name)
    wb.Sheets[ws_name] = ws

    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'})

    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "test.xlsx")
}

function formatJson(jsonData) {
    console.log(jsonData)
}
// 到处excel数据
export function exportJsonToExcel(th, jsonData, defaultTitle) {

    /* original data */

    let data = jsonData
    data.unshift(th)
    let ws_name = "SheetJS"

    let wb = new Workbook(), ws = sheet_from_array_of_arrays(data)


    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name)
    wb.Sheets[ws_name] = ws

    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'})
    let title = defaultTitle || '列表'
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), title + ".xlsx")
}
// 到处模版，只有表头
export function exportJsonToExcelModule(th, jsonData, defaultTitle) {

    /* original data */

    let data = jsonData
    data.unshift(th)
    let ws_name = "SheetJS"

    let wb = new Workbook(), ws = sheet_from_array_of_arrays(data)


    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name)
    wb.Sheets[ws_name] = ws

    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'})
    let title = defaultTitle || '列表'
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), title + ".xlsx")
}
// formData传输数据
export function exportJsonToExcelForForm(th, jsonData) {

    /* original data */

    let data = jsonData
    data.unshift(th)
    let ws_name = "SheetJS"

    let wb = new Workbook(), ws = sheet_from_array_of_arrays(data)


    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name)
    wb.Sheets[ws_name] = ws

    let wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'})
    let file = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
    return file
}
export function formatJson (filterVal, jsonData) { // key值 和 JSON员工数据的过滤
    return jsonData.map(v => filterVal.map(j => v[j]))
}
