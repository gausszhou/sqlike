import SQLike from "..";

// Example usage
type User = { id: number; class_id: number, name: string; age: number, city: string, gender: string };

const users: User[] = [
  { id: 1, class_id: 1, name: 'Alice', age: 20, city: 'New York', gender: 'female' },
  { id: 2, class_id: 1, name: 'Bob', age: 25, city: 'New York' , gender: 'male' },
  { id: 3, class_id: 2, name: 'Charlie', age: 30, city: 'Los Angeles', gender: 'female'  },
  { id: 4, class_id: 2, name: 'David', age: 25, city: 'Los Angeles', gender: 'male'  },
  { id: 5, class_id: 3, name: 'Ethan', age: 30, city: 'New York' , gender: 'male' },
  { id: 6, class_id: 3, name: 'Frank', age: 20, city: 'New York', gender: 'male'  },
];

type IClass = { id: number, name:  string} ;

const classes: IClass[] = [
  { id: 1, name: 'one'},
  { id: 2, name: 'two'},
  { id: 3, name: 'three'}
]

console.log('=======users');
console.log(users);

console.log('=======where1');
const filteredUsers = new SQLike(users).where(item => item.age > 25).value();
console.log(filteredUsers);

console.log('=======groupBy city');
const groupedUsers1 = new SQLike(users).groupBy('city').value();
console.log(groupedUsers1);

console.log('=======groupBy city gender');
const groupedUsers2 = new SQLike(users).groupBy(['city', 'gender']).value();
console.log(groupedUsers2);

console.log('=======groupBy city gender merge');
const groupedUsers3 = new SQLike<User>(users).groupBy(['city', 'gender']).merge((list: User[]) => {
  return {
    city: list[0].city,
    gender: list[0].gender,
    age: list.map(item => item.age).reduce((a,b) => a + b) / list.length
  }
}).value();
console.log(groupedUsers3)

console.log('=======innerJoin');
const joinUsersAndClass = new SQLike<User>(users).innerJoin(new SQLike(classes), (a,b) => a.class_id === b.id).merge(([a, b]) => {
  return {
    ...a,
    ...b,
    id: a.id,
    class_id: b.id    
  }
}).value()
console.log(joinUsersAndClass);

console.log('=======orderBy age');
const sortedUsers1 = new SQLike<User>(users).orderBy((a, b) => a.age - b.age).value();
console.log(sortedUsers1);
console.log('=======orderBy city age');
const sortedUsers2 = new SQLike<User>(users).orderBy([
  (a, b) => a.city.localeCompare(b.city), // First sort by city
  (a, b) => a.age - b.age// Then sort by age if city is the same
]).value();
console.log(sortedUsers2);

console.log('=======limit');
const limitedUsers = new SQLike<User>(users).limit(3).value();
console.log(limitedUsers)

console.log('=======compose');
const composeUsers = new SQLike<User>(users).orderBy((a, b) => a.age - b.age).limit(3).value();
console.log(composeUsers); 
