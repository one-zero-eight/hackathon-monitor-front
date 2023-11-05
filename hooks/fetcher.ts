export default async function fetcher(url: string, auth: string | undefined) {
  auth = auth || process.env.NEXT_PUBLIC_AUTH_STRING;
  const res = await fetch(url, {
    headers: {
      Authorization: auth ? `Bearer ${auth}` : ``,
    },
  });

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    // @ts-ignore
    error.info = await res.json();
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return res.json();
}
