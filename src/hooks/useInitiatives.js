import { useState, useEffect } from 'react'
import axios from 'axios'

const BACKEND_URL = "http://147.79.66.243:5000";

export const useInitiatives = () => {
  const [initiatives, setInitiatives] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/initiatives`)
        setInitiatives(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInitiatives()
  }, [])

  return { initiatives, loading, error }
}