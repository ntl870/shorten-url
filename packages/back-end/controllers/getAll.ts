import { Request, Response } from 'express'
import { db } from '../db/connection'

export const getAllProgrammingLanguages = (req: Request, res: Response) => {
  try {
    db.query('SELECT * FROM url', (error, results, fields) => {
      return res.json(results)
    })
  } catch (e) {
    return res.status(500).send('Error')
  }
}
