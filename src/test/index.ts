import { groupBy, groupByMultiple, sortBy, sortByMultiple } from "..";
import { limit } from "../modules/limit";

// Example usage
type User = { id: number; name: string; age: number, city: string };

const users: User[] = [
  { id: 1, name: 'Alice', age: 20, city: 'New York' },
  { id: 2, name: 'Bob', age: 25, city: 'New York' },
  { id: 3, name: 'Charlie', age: 30, city: 'Los Angeles' },
  { id: 4, name: 'David', age: 25, city: 'Los Angeles' },
  { id: 5, name: 'Ethan', age: 30, city: 'New York' },
  { id: 6, name: 'Frank', age: 20, city: 'New York' },
];

console.log(users);

console.log('=======group1');
const groupedUsers1 = groupBy(users, 'age');
console.log(groupedUsers1);
console.log('=======group2');
const groupedUsers2 = groupByMultiple(users, ['age', 'city']);
console.log(groupedUsers2);

console.log('=======sort1');
const sortedUsers1 = sortBy(users, (a, b) => a.age - b.age);
console.log(sortedUsers1);
console.log('=======sort2');
const sortedUsers2 = sortByMultiple(users, [
  (a, b) => a.city.localeCompare(b.city), // First sort by city
  (a, b) => a.age - b.age// Then sort by age if city is the same
]);
console.log(sortedUsers2);

console.log('=======limit');
const limitedUsers = limit(users, 3);
console.log(limitedUsers)
