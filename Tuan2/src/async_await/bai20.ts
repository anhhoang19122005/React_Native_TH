interface User {
    id: number;
    name: string;
    email: string;
};

function fetchUser(id: number): Promise<User> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `User ${id}`,
                email: `user${id}@gmail.com`
            });
        }, 3000);
    });
}

function timeout(time: number): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Request timeout"));
        }, time);
    });
}

async function main() {
    try {
        const user = await Promise.race([
            fetchUser(1),
            timeout(2000)
        ]);

        console.log(user);
    } catch (error) {
        console.log("Error:", error);
    }
}

main();