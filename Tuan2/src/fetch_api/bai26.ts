function wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

async function main() {
    console.log("Waiting for 5 seconds...");
    await wait(5000);
    console.log("5 seconds have passed.");
}

main().catch((error: unknown) => {
    console.error(error);
});
