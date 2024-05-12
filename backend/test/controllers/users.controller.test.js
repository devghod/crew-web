const { 
  getUsersTest,
  // getUsers, 
  // getUserById, 
  // getUsersStatistics,
  // getUsersByFilter,
  // addUser, 
  // updateUser, 
  // deleteUser,
  // updateUserStatus,
} = require('../../src/controllers/users.controller');
const { sum } = require('./sum');

describe("Sum of two items", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("Get all users", () => {
  let users;

  beforeAll(async () => {
    users = await getUsersTest();
  });
  
  test('return array of users', () => {
    expect(users).toBeInstanceOf(Object);
  });
});

// const { sum } = require('./sum');

// describe("Sum of two items", () => {
//   let result;

//   beforeAll(async () => {
//     result = await sum(2, 2);
//   });

//   test("It should return 4", () => {
//     expect(result).toBe(4);
//   });
// });

// test('gets all users', async () => {
//   const users = await getUsers();
//   console.log(users)
  // expect(users).toBeInstanceOf(Array);
  // expect(users).toHaveProperty('total');
  // expect(users).toHaveProperty('success');
  // expect(users).toHaveProperty('message');

  // users.forEach(user => {
  //   expect(user).toHaveProperty('first_name');
  //   expect(user).toHaveProperty('middle_name');
  //   expect(user).toHaveProperty('last_name');
  //   expect(user).toHaveProperty('email');
  //   expect(user).toHaveProperty('status');
  //   expect(user).toHaveProperty('username');
  //   expect(user).toHaveProperty('date_created');
  //   expect(user).toHaveProperty('image');
  //   expect(user).toHaveProperty('gender');
  // });
// });