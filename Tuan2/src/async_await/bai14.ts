function multiplyByThree(num: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    })
}

async function main() {
    const result = await multiplyByThree(3);
    console.log(result);
}

main()