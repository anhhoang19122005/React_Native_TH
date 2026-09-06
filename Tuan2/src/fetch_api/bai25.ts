function downloadFile(fileName: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${fileName} downloaded successfully`);
        }, 3000);
    });
}

async function main() {
    console.log("Downloading file...");
    const result = await downloadFile("example.txt");
    console.log(result);
}

main().catch((error: unknown) => {
    console.error(error);
});
