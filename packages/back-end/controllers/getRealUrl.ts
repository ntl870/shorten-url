import { Request, Response } from 'express'
import { db } from '../db/connection'

interface GetUrlRequest {
  shortenUrl: string
}

interface GetUrlResponse {
  success: boolean
  message?: string
  realUrl: string
}

export const getRealUrl = (req: Request<GetUrlRequest>, res: Response<GetUrlResponse>) => {
  const { url } = req.query

  try {
    db.query(`SELECT * FROM url WHERE shorten_url = '${url}'`, (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: String(error),
          realUrl: ''
        })
      }
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          realUrl: result[0]?.real_url
        })
      }
      if (result.length === 0) {
        return res.status(400).send({
          success: false,
          message: 'URL not found',
          realUrl: ''
        })
      }
    })
  } catch (e) {
    console.log(e)
  }
}
