import * as express from "express";

export default (queue) =>
    express.Router()
        .post('/', (req, res) => {
                let o = {
                    ts: req.get('TS'),
                    bs: req.get('BS'),
                    df: req.get('DF'),
                    id: req.get('ID'),
                    data: req.body
                };
                queue.push(o);
                //console.log(o);
                res.send('OK');
            }
        )
