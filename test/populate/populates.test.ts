import supertest from 'supertest';
import { Seed } from '../config/seed';
import { users } from '../user/data.user';
import { closeRedisConnection, deleteCacheRedis } from '../../redisConfig';
import { StatusCode } from '../../src/enums/status.code';

describe('Populates', () => {
    let request: any;
    let seed: Seed;

    beforeAll(async () => {
        seed = new Seed();
        request = supertest(seed.express);
    });

    beforeEach(async () => {
        await seed.deleteAllDocuments('users');
        await seed.insertDataDefault(users, 'users');
        await deleteCacheRedis();
    });

    afterAll(async () => {
        await seed.dropDatabase();
        await seed.closeDatabaseConnection();
        await deleteCacheRedis();
        await closeRedisConnection();
    });

    describe('POST /populates/:id', () => {
        it('should populate a database using Series id', async () => {
            const serieId = '2063';
            const token: string = await getToken('user1', '1234');
            const response = await request
                .post(`/populates/${serieId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toEqual(StatusCode.CREATED);
            await new Promise(resolve => setTimeout(resolve, 6000));
        }, 30000);
    });

    async function getToken(user: string, password: string) {
        const response = await request
            .post(`/users/auth`)
            .send({ username: user, password: password });
        return response.body;
    }
});
