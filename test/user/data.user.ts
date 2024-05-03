import userSchema from '../../src/schema/user.schema';

const users = [
    {
        email: 'user1@gmail.com',
        username: 'user1',
        password: 'abc1234',
        isAdmin: false
    },
    {
        email: 'user2@gmail.com',
        username: 'user2',
        password: 'cba1234',
        isAdmin: false
    },
    {
        email: 'user3@gmail.com',
        username: 'user3',
        password: 'abc4321',
        isAdmin: false
    },
    {
        email: 'user4@gmail.com',
        username: 'user4',
        password: 'acb1344',
        isAdmin: false
    },
    {
        email: 'user5@gmail.com',
        username: 'user5',
        password: 'bbasd1234',
        isAdmin: false
    }
];
export { users };

const getUsersIds = async () => {
    try {
        const users = await userSchema.find({}, '_id');
        const userIds = users.map(user => user._id);
        return userIds;
    } catch (error) {
        console.error('Erro ao recuperar IDs dos usuários:', error);
        return [];
    }
};

export { getUsersIds };
