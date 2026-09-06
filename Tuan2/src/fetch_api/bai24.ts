interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

async function postData(): Promise<Post> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: "A new post",
            body: "This is test data.",
            userId: 1,
        }),
    });

    if (!response.ok) {
        throw new Error(`POST request failed with status ${response.status}`);
    }

    return (await response.json()) as Post;
}

postData()
    .then((post) => console.log(post))
    .catch((error: unknown) => {
        console.error(error instanceof Error ? error.message : error);
    });
