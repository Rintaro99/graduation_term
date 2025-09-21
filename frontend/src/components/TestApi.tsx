import { useEffect, useState } from 'react'

export default function TestApi() {
  const [data, setData] = useState<string>('')

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseURL}/api/test`)
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  return <div>{data}</div>
}
