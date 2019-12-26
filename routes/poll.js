import * as express from "express";

export default (queue) => {
    return express.Router()
        .get('/', async (req, res) => {
                let q = queue.map((value, index, array) => {
                    let dataArr = [];
                    for (let i = 0; i < value.data.length; i += 2) {
                        dataArr.push(value.data.readInt16LE(i))
                    }
                        return {
                            ts: value.ts,
                            bs: value.bs,
                            df: value.df,
                            id: value.id,
                            data: dataArr
                        }
                    }
                );
                queue.length = 0;
                res.json(q);
            }
        )
}
