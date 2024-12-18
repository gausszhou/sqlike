# SQLike

## example

```ts
type User = { id: number; name: string; age: number, city: string, gender: string };

const users: User[] = [
  { id: 1, name: 'Alice', age: 20, city: 'New York', gender: 'female' },
  { id: 2, name: 'Bob', age: 25, city: 'New York' , gender: 'male' },
  { id: 3, name: 'Charlie', age: 30, city: 'Los Angeles', gender: 'female'  },
  { id: 4, name: 'David', age: 25, city: 'Los Angeles', gender: 'male'  },
  { id: 5, name: 'Ethan', age: 30, city: 'New York' , gender: 'male' },
  { id: 6, name: 'Frank', age: 20, city: 'New York', gender: 'male'  },
];
```

## where

```ts
console.log('=======where1');
const filteredUsers = new SQLike(users).where(item => item.age > 25).value();
console.log(filteredUsers);
```

## pick

## omit

## groupBy and merge

```ts
console.log('=======group1');
const groupedUsers1 = new SQLike(users).groupBy('age').value();
console.log(groupedUsers1);

console.log('=======group2');
const groupedUsers2 = new SQLike(users).groupBy(['age', 'city']).value();
console.log(groupedUsers2);
```

## innerJoin and merge

```ts
console.log('=======innerJoin');
const joinUsersAndClass = new SQLike<User>(users)
.innerJoin(new SQLike(classes), (a,b) => a.class_id === b.id)
.merge(([a, b]) => {
  return {
    ...a,
    ...b,
    id: a.id,
    class_id: b.id    
  }
})
.value()
console.log(joinUsersAndClass);
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

## Todo List

- [x] class
- [x] where
- [ ] pick
- [ ] omit
- [x] sort
- [x] limit
- [x] groupBy
- [ ] join
  - [x] innerJoin
  - [ ] outerJoin
- [x] merge
- [ ] unit tests
