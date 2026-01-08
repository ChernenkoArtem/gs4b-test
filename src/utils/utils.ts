export const simulateApiRequest = async <T>(
  endpoint: string,
  options?: RequestInit,
  errorMsg?: string,
  isDelay: boolean = true,
): Promise<T> => {
  if (isDelay) {
    const delay = Math.floor(Math.random() * (2000 - 200 + 1)) + 200;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(
        (errorMsg ? `${errorMsg}:` : 'Server Error') +
          response.status +
          ',' +
          response.statusText,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
