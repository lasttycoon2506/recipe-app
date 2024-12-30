function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sleep() {
	await delay(1000); // Wait for 1 second
}
