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

async function main() {
    const user = await fetchUser(1);
    console.log(user);
}

main().catch((error: unknown) => {
    console.error(error);
});
