async function handler(req, res) {
    const { stat_name, limit, offset } = req.query

    // get request with Authorization
    try {
        const resp = await fetch(`http://10.91.8.75:8000/pg/stat-${stat_name}?limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + '6160419207:AAGMJrNNVYz0sVCh6iP0_58p_63HbzR5iMM'
            }
        })

        const data = await resp.json()
        res.status(200).json(data)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Error' })
    }
}

export default handler