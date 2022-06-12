import { Request, Response } from 'express'
import { db } from '../db/connection'
import { genRandom } from '../utils'

interface GenerateRequest {
  realURL: string
}

interface GenerateResponse {
  success: boolean
  shortenURL: string
  message?: string
}

export const generateUrl = (req: Request<GenerateRequest>, res: Response<GenerateResponse>) => {
  const { realURL } = req.body
  let generatedURL = genRandom(5)
  while (true) {
    let isExisted = false
    db.query(`SELECT * FROM url WHERE shorten_url = '${generatedURL}'`, (error, result) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: String(error),
          shortenURL: ''
        })
      }

      if (result.length > 0) {
        generatedURL = genRandom(5)
        isExisted = true
      }
    })
    if (!isExisted) break
  }

  try {
    db.query(`INSERT INTO url VALUES (default, '${realURL}', '${generatedURL}')`, (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: String(error),
          shortenURL: ''
        })
      }
      return res.status(200).json({
        success: true,
        shortenURL: generatedURL
      })
    })
  } catch (e) {
    throw new Error(String(e))
  }
}
