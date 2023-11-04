async function handler(req, res) {
  const { stat_name, limit, offset, target_alias } = req.query;

  const authorization =
    req.headers.Authorization || `Bearer ${process.env.AUTH_TOKEN}`;

  if (!authorization) {
    return res
      .status(500)
      .json({ message: "Authorization string is missing." });
  }

  try {
    const apiUrl = `https://62d6-188-130-155-146.ngrok-free.app/views/execute/${stat_name}?limit=${limit}&offset=${offset}&target_alias=${target_alias}`;

    const resp = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorization,
      },
    });

    if (resp.ok) {
      const data = await resp.json();
      res.status(200).json(data);
    } else {
      console.log(await resp.json());
      console.error(`Request failed with status ${resp.status}`);
      res.status(resp.status).json({ message: "Error" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error" });
  }
}

export default handler;
