import { groupBy } from "../index.ts";
import { limit } from "../modules/limit.ts";
import { createDateDayList } from "./date.ts";
import { createTableUI } from "./table.ts";
import { RawRow } from "./type.ts";

const RENDER_ROWS_MAX = 10

const randomNumber = (max = 10) => {
  return Math.ceil(Math.random() * max);
};

const randomString = (base: string) => {
  return base + "-" + randomNumber();
};

const createCompose = (): RawRow => {
  return {
    event: randomString("event"),
    group: randomString("group"),
    prop1: randomString("prop1"),
    prop2: randomString("prop2"),
    prop3: randomString("prop3"),
    prop4: randomString("prop4"),
    date: '',
    count: 0,
  };
};

const createRawRow = (compose: RawRow, date: string): RawRow => {
  return {
    ...compose,
    date: date,
    count: randomNumber(),
  };
};

const getKey = (row: RawRow) => {
  return row.event + row.group + row.prop1 + row.prop2 + row.prop3 + row.prop4 + row.date;
};

const dateList = createDateDayList("2024-01-01", "2024-01-31");
const days = dateList.length

const createDataSet = (count: number) => {
  const result: RawRow[] = [];
  const uniqueMap: Record<string, 1> = {};
  for (let i = 0; i < count; i++) {
    const compose = createCompose();
    for (let index = 0; index < dateList.length; index++) {
      const date = dateList[index];
      const row = createRawRow(compose, date)
      const key = getKey(row);
      if (uniqueMap[key] !== 1) {
        result.push(row);
      }
      uniqueMap[key] = 1;
    }
  }
  return result;
};

console.time('create')
const dateSet = createDataSet(200);
console.timeEnd('create')

function renderRaw(container: HTMLElement) {
  const table = createTableUI(limit(dateSet, RENDER_ROWS_MAX));
  const count = dateSet.length;
  container.innerHTML =  `<div>${count}</div>`  + table;
}

function renderHor(container: HTMLElement, groupByList: string[]) {
  // TODO
  return false;
  const propList = ["event", "group", "prop1", "prop2", "prop3", "prop4"];
  const groupByMap:any = {};
  groupByList.forEach((key) => (groupByMap[key] = true));
  const tableDataGroup = groupBy(dateSet, groupByList);
  const tableData: RawRow[] = [];
  Object.keys(tableDataGroup).forEach((key) => {
    const list = tableDataGroup[key];
    const sum = list.map((item) => item.count).reduce((a, b) => a + b);
    const first:any = list[0];
    const row:any = {};
    propList.forEach((key) => {
      if (groupByMap[key]) {
        row[key] = first[key];
      }
    });
    row.sum = sum;
    row.mean = (sum / days).toFixed(2);
    const dateMap: Record<string, number> = {};
    list.forEach((item) => {
      const key = item.date;
      const value = item.count || 0;
      if (dateMap[key]) {
        dateMap[key] += value;
      } else {
        dateMap[key] = value;
      }
    });
    
    dateList.forEach((date) => {
      row[date] = dateMap[date] || 0;
    });
    tableData.push(row);
  });
  const table = createTableUI(limit(tableData, RENDER_ROWS_MAX));
  const count = tableData.length;
  container.innerHTML =  `<div>${count}</div>`  + table;
}

function renderVert(container: HTMLElement, groupByList: string[]) {
  return false;
  const propList = ["group", "prop1", "prop2", "prop3", "prop4", "date"];
  const groupByMap:any = {};
  groupByList.forEach((key) => (groupByMap[key] = true));
  const events = Object.keys(groupBy(dateSet, ["event"]));
  const tableDataGroup = groupBy(dateSet, groupByList);
  const tableData: RawRow[] = [];
  Object.values(tableDataGroup).forEach((list) => {
    const first:any = list[0];
    const row:any = {};
    propList.forEach((key) => {
      if (groupByMap[key]) {
        row[key] = first[key];
      } else {
        row[key] = "全部";
      }
    });
    const eventMap: Record<string, number> = {};
    list.forEach((item) => {
      const key = item.event;
      const value = item.count || 0;
      if (eventMap[key]) {
        eventMap[key] += value;
      } else {
        eventMap[key] = value;
      }
    });
    events.forEach((event) => {
      row[event] = eventMap[event] || 0;
    });
    tableData.push(row);
  });
  
  const table = createTableUI(limit(tableData, RENDER_ROWS_MAX));
  const count = tableData.length;
  container.innerHTML = `<div>${count}</div>`  + table;
}

const $raw = document.getElementById("raw-table");
const $horizontal1 = document.getElementById("horizontal-table-1");
const $horizontal2 = document.getElementById("horizontal-table-2");
const $horizontal3 = document.getElementById("horizontal-table-3");
const $horizontal4 = document.getElementById("horizontal-table-4");
const $vertical1 = document.getElementById("vertical-table-1");
const $vertical2 = document.getElementById("vertical-table-2");
const $vertical3 = document.getElementById("vertical-table-3");
const $vertical4 = document.getElementById("vertical-table-4");

if ($raw) {
  
  renderRaw($raw);
}

if ($horizontal1) {
  console.time('h1')
  renderHor($horizontal1, ["event"]);
  console.timeEnd('h1')
}

if ($horizontal2) {
  console.time('h2')
  renderHor($horizontal2, ["event", "group"]);
  console.timeEnd('h2')
}

if ($horizontal3) {
  console.time('h3')
  renderHor($horizontal3, ["event", "group", "prop1"]);
  console.timeEnd('h3')
}

if ($horizontal4) {
  console.time('h4')
  renderHor($horizontal4, ["event", "group", "prop1", "prop2","prop3", "prop4"]);
  console.timeEnd('h4')
}

if ($vertical1) {
  console.time('v1')
  renderVert($vertical1, ["group"]);
  console.timeEnd('v1')
}

if ($vertical2) {
  console.time('v2')
  renderVert($vertical2, ["group", "prop1"]);
  console.timeEnd('v2')
}

if ($vertical3) {
  console.time('v3')
  renderVert($vertical3, ["group", "prop1", "prop2"]);
  console.timeEnd('v3')
}

if ($vertical4) {
  console.time('v4')
  renderVert($vertical4, ["group", "prop1", "prop2", "prop3", "prop4", "date"]);
  console.timeEnd('v4')
}
