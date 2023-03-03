import  icp from '../json/icp.json'

export default function handler(req, res) {
    const { pid } = req.query
    // res.end(`Post: ${pid}`)
    try {
        if (pid == '1'){
            res.status(200).json(icp)
        }else{
            res.status(200).json({ hello:"1" })
        }
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }

}
