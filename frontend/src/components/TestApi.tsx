import { useEffect, useState } from 'react'

export default function TestApi() {
  const [data, setData] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:3000/api/test')
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, [])

  return <div>{data}</div>
}
