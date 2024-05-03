import supertest from 'supertest';
import { Seed } from '../config/seed';
import { getUsersIds, users } from './data.user';

describe('Users', () => {
    let request: any;
    let seed: Seed;
    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('users');
        await seed.insertDataDefault(users, 'users');
    });
    afterAll(async () => {
        await seed.dropDatabase();
        await seed.closeDatabaseConnection();
    });
    describe('GET /users', () => {
        it('should return users', async () => {
            const response = await request.get('/users');
            const result = JSON.parse(response.text).data;

            expect(response.statusCode).toEqual(200);
            expect(result.length).toEqual(5);
            expect(result[1].username).toEqual('user2');
            expect(result[3].isAdmin).toBe(false);
        });
    });

    describe('GET /users/:id', () => {
        it('should return user by id', async () => {
            const usersId = await getUsersIds();
            const userId = usersId[0];
            const response = await request.get(`/users/${userId}`);
            const result = await response.body;

            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe('user1');
            expect(result.email).toBe('user1@gmail.com');
        });

        // it('should return Id not found', async () => {
        //     const userId = '661317e10b061b35263b93d1';
        //     const response = await request.get(`/users/${userId}`);
        //     const result = await response.body;
        //     console.log(result.message);
        //     expect(response.statusCode).toEqual(404);
        //     // expect(result.message).toBe('Id not found');
        // });
    });

    // describe('POST /users', () => {
    //     it('should return created user', async () => {
    //         const newUser = {
    //             email: 'jean232@gmail.com',
    //             username: 'jean1234',
    //             password: 'teste',
    //             isAdmin: false
    //         };

    //         let responseUsers = await request.get('/users');
    //         let resultUsers = await responseUsers.body;
    //         console.log(resultUsers.data.length);
    //         expect(resultUsers.data.length).toEqual(5);

    //         const response = await request.post(`/users`).send(newUser);
    //         expect(response.statusCode).toEqual(201);

    //         responseUsers = await request.get('/users');
    //         resultUsers = await responseUsers.body;

    //         expect(responseUsers.statusCode).toEqual(200);
    //         expect(resultUsers.data.length).toEqual(6);
    //     });
    // });

    describe('POST /auth', () => {
        it('should return user valid', async () => {
            const user = {
                email: 'user1@gmail.com',
                password: 'abc1234'
            };

            const response = await request.post(`/users/auth`).send(user);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('PUT /users', () => {
        it('should return updated user', async () => {
            const userId = (await getUsersIds())[0];
            let response = await request.get(`/users/${userId}`);
            let result = await response.body;

            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe('user1');
            expect(result.email).toBe('user1@gmail.com');

            const newUser = {
                username: 'user1234',
                email: 'user1234@gmail.com'
            };

            response = await request.put(`/users/${userId}`).send(newUser);
            expect(response.statusCode).toEqual(200);

            response = await request.get(`/users/${userId}`);
            result = await response.body;
            console.log(result);

            expect(response.statusCode).toEqual(200);
            expect(result.username).toBe('user1234');
            expect(result.email).toBe('user1234@gmail.com');
        });
    });

    describe('DELETE /users', () => {
        it('should return deleted user', async () => {
            let responseUsers = await request.get('/users');
            let resultUsers = JSON.parse(responseUsers.text).data;
            console.log(resultUsers);
            expect(resultUsers.length).toEqual(5);
            expect(responseUsers.statusCode).toEqual(200);

            const userId = (await getUsersIds())[0];
            let response = await request.delete(`/users/${userId}`);
            console.log(response.body);
            expect(response.statusCode).toEqual(204);

            responseUsers = await request.get('/users');
            resultUsers = await responseUsers.body;

            expect(resultUsers.length).toEqual(4);
            expect(responseUsers.statusCode).toEqual(200);
        });
    });
});
