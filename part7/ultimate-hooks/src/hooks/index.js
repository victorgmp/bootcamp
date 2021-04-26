import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  
  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      console.log(response.data)
      setResources([...resources, response.data])
    } catch (error) {
      console.log(error)
    }
  }

  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}