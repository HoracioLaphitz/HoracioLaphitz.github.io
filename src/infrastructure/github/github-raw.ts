const RAW_BASE = "https://raw.githubusercontent.com";

const rateLimiter = (() => {
    const timestamps: number[] = [];
    const WINDOW_MS = 1000;
    const MAX_REQUESTS = 5;

    return async function check(): Promise<void> {
        const now = Date.now();
        // Remove timestamps outside the window
        while (timestamps.length > 0 && now - timestamps[0] > WINDOW_MS) {
            timestamps.shift();
        }
        // If at limit, wait for the oldest request to age out
        if (timestamps.length >= MAX_REQUESTS) {
            const oldest = timestamps[0];
            const waitTime = WINDOW_MS - (now - oldest);
            if (waitTime > 0) {
                await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
            timestamps.shift();
        }
        timestamps.push(Date.now());
    };
})();

export async function fetchGithubRaw(
    repo: string,
    branch: string,
    path: string,
    timeoutMs = 10_000
): Promise<string> {
    await rateLimiter();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(`${RAW_BASE}/${repo}/${branch}/${path}`, {
            signal: controller.signal,
            headers: {
                Accept: "text/plain, text/csv, application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} fetching ${repo}/${path}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && !contentType.match(/text\/|application\/json/)) {
            throw new Error(
                `Unexpected content-type "${contentType}" for ${repo}/${path}`
            );
        }

        return await response.text();
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error(`Timeout fetching ${repo}/${path}`);
        }
        throw error;
    } finally {
        clearTimeout(timer);
    }
}
