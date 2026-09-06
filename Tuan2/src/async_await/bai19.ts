interface User {
    id: number;
    name: string;
    email: string;
}

function fetchUser(id: number): Promise<User> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
            });
        }, 1000);
    });
}

async function fetchUsers(ids: number[]): Promise<User[]> {
    return Promise.all(ids.map((id) => fetchUser(id)));
}

async function main() {
    const users = await fetchUsers([1, 2, 3]);
    console.log(users);
}

main().catch((error: unknown) => {
    console.error(error);
});
