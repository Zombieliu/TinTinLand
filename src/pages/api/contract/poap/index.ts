import contractUri from '../../json/tintin.json'

export default async function handler(req, res) {
    try {
        // const result = {hello:1}
        res.status(200).json(contractUri)
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
