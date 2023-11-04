async function handler(req, res) {
    const { start, end, step, query_range } = req.query;
    const url = `http://localhost:9090/api/v1/query_range?query=${query_range}&start=${start}&end=${end}&step=${step}`;
    const response = await fetch(url);
    if (!response.ok) {
        res.status(500).json({ message: 'Something went wrong!' });
        return;
    }
    const data = await response.json();
    res.status(200).json(data);
}

export default handler;