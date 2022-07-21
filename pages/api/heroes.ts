import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../db.json";
import middleCors from "../../middleware/cors";
import { cors } from "../../middleware/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await middleCors(req, res, cors);
  let pageOffset = Number(req.query.pageOffset);
  let pageSize = Number(req.query.pageSize);

  if (Number(pageSize)) {
    const start = Number(pageSize) * pageOffset;
    const end = start + Number(pageSize);
    const page = db.heroes.slice(start, end);

    return res.json({
      items: page,
      nextPageOffset:
        db.heroes.length > end ? Number(pageOffset) + 1 : undefined,
    });
  } else {
    return res.json(db);
  }
}
