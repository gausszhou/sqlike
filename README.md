# sqlike

## example 

```js
// Example usage
type User = { id: number; name: string; age: number, city: string };

const users:User[] = [
  { id: 1, name: 'Alice', age: 20 ,city: 'New York'},
  { id: 2, name: 'Bob', age: 25 ,city: 'New York'},
  { id: 3, name: 'Charlie', age: 30, city: 'Los Angeles' },
  { id: 4, name: 'David', age: 25 ,city: 'Los Angeles'},
  { id: 5, name: 'Ethan', age: 30 ,city: 'New York'},
  { id: 6, name: 'Frank', age: 20 ,city: 'New York'},
];
```

## group

```js
// groupBy(list, groupKey)
const groupedUsers1 = groupBy(users, 'age');
const groupedUsers2 = groupByMultiple(users, ['age', 'city']);
```

## sort

```js
// sortBy(list, comparator)
const sortedUsers1 = sortBy(users, (a, b) => a.age - b.age);
const sortedUsers2 = sortByMultiple(users, [
  (a, b) => a.city.localeCompare(b.city), // First sort by city
  (a, b) => a.age - b.age// Then sort by age if city is the same
]);
```

## limit

```js
// limit(list, limit, offset)
const limitedUsers = limit(users, 3);
const limitedUsers = limit(users, 3, 1);
```