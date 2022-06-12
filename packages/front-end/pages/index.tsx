import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormControl,
  FormHelperText
} from '@chakra-ui/react'
import { isValidURL } from '../utils/functions'

const Home: NextPage = () => {
  const [input, setInput] = useState('')
  const [shortenURL, setShortenURL] = useState('')
  const [error, setError] = useState('')

  const getShortenURL = async () => {
    const formattedInput = `https://${input.trim()}`
    try {
      if (!isValidURL(formattedInput)) {
        setError('Invalid URL')
        return
      } else setError('')

      const response = await fetch('http://localhost:4000/v1/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          realURL: input
        })
      })
      const data = await response.json()
      setShortenURL(data.shortenURL)
    } catch (e) {}
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputURL}>
        <FormControl>
          <InputGroup size="md" marginRight="1rem">
            <InputLeftAddon>https://</InputLeftAddon>
            <div style={{ minWidth: '35rem' }}>
              <Input
                placeholder="Enter your URL"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                isInvalid={!!error}
              />
              {!!error && <FormHelperText color="red.500">{error}</FormHelperText>}
            </div>
          </InputGroup>
        </FormControl>

        <Button colorScheme="teal" onClick={getShortenURL}>
          Get
        </Button>
      </div>

      <Input value={`http://localhost:3000/${shortenURL}`} maxWidth="45rem" marginTop="1rem" readOnly />
    </div>
  )
}

export default Home
