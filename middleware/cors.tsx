import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

export const cors = Cors({
  methods: ["GET", "HEAD"],
});

export default function middleCors(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
