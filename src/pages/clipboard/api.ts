type GetTextRes = {
  text: string
}

type PostTextRes = {
  accessCode: string
}

interface GetStatusRes {
  numberOfTexts: number
  maxNumberOfTexts: number
  maxLengthOfText: number
  timeout: number
}

const BASE_URL = 'https://api.tools.1024.cab'

export async function getText(accessCode: string) {
  const res = await fetch(`${BASE_URL}/clipboard/text?accessCode=${accessCode}`)
  return { res, jsonPromise: <Promise<GetTextRes>>(res.json()) }
}

export async function deleteText(accessCode: string) {
  const res = await fetch(`${BASE_URL}/clipboard/text?accessCode=${accessCode}`, {
    method: 'DELETE',
  })
  return { res }
}

export async function postText(text: string, timeout?: number) {
  const res = await fetch(`${BASE_URL}/clipboard/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      timeout,
    }),
  })
  console.log(JSON.stringify({
    text,
    timeout,
  }))
  return { res, jsonPromise: <Promise<PostTextRes>>(res.json()) }
}

export async function getStatus() {
  const res = await fetch(`${BASE_URL}/clipboard/status`)
  return { res, jsonPromise: <Promise<GetStatusRes>>(res.json()) }
}
