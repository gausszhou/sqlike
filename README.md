# SQLike

## example

```ts
// Example usage
type User = { id: number; name: string; age: number, city: string };

const users: User[] = [
  { id: 1, name: 'Alice', age: 20 ,city: 'New York'},
  { id: 2, name: 'Bob', age: 25 ,city: 'New York'},
  { id: 3, name: 'Charlie', age: 30, city: 'Los Angeles' },
  { id: 4, name: 'David', age: 25 ,city: 'Los Angeles'},
  { id: 5, name: 'Ethan', age: 30 ,city: 'New York'},
  { id: 6, name: 'Frank', age: 20 ,city: 'New York'},
];
```

## groupBy

```ts
console.log('=======group1');
const groupedUsers1 = new SQLike(users).groupBy('age').value();
console.log(groupedUsers1);

console.log('=======group2');
const groupedUsers2 = new SQLike(users).groupBy(['age', 'city']).value();
console.log(groupedUsers2);
```

## orderBy

```ts
console.log('=======sort1');
const sortedUsers1 = new SQLike<User>(users).orderBy((a, b) => a.age - b.age).value();
console.log(sortedUsers1);
console.log('=======sort2');
const sortedUsers2 = new SQLike<User>(users).orderBy([
  (a, b) => a.city.localeCompare(b.city), // First sort by city
  (a, b) => a.age - b.age// Then sort by age if city is the same
]).value();
console.log(sortedUsers2);
```

## limit

```ts
console.log('=======limit');
const limitedUsers = new SQLike<User>(users).limit(3).value();
console.log(limitedUsers)
```

## compose

```ts
console.log('=======compose');
const composeUsers = new SQLike<User>(users).orderBy((a, b) => a.age - b.age).limit(3).value();
console.log(composeUsers); 
```

## Todo List

- [x] class
- [x] groupBy
- [x] sort
- [x] limit
- [x] where
- [ ] join
- [x] Chain calls
- [ ] unit tests
