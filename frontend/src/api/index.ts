type AsyncResult<T> = { data: T; error: null } | { data: null; error: Error };

async function fetchData<T>(url: string): Promise<AsyncResult<T>> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
        }
        const data = (await response.json()) as T;
        return { data, error: null };
    } catch (error) {
        const castedError = error as Error;
        console.error("Error fetching data:", error);
        return { error: castedError, data: null };
    }
}

export { fetchData };
