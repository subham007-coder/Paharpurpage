import { useState, useEffect } from 'react'
import { getInitiatives } from '../services/api'

export const useInitiatives = () => {
  const [initiatives, setInitiatives] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const data = await getInitiatives()
        setInitiatives(data)
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