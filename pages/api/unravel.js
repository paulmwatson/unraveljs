const unravel = async (url, stripUtm, hops = []) => {
  if (stripUtm) {
    url = url.replace(/&?utm_.+?(&|$)/gi, '')
  }

  url = new URL(url)

  const options = {
    redirect: 'manual',
    headers: new Headers({ 'User-Agent': 'NodeJS/Unravel 1.0.0' }),
  }

  const response = await fetch(url, options)

  let headers = {}
  response.headers.forEach((value, key) => {
    headers[key] = value
  })

  hops.push({
    url: url,
    headers: headers,
  })

  if (headers['location']) {
    return unravel(headers['location'], stripUtm, hops)
  } else {
    return hops
  }
}

export default async (req, res) => {
  const url = req.query.url
  const unravelled = await unravel(url, true)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(unravelled))
}
