import { apiBaseUrl } from '~/config'
import { jsonFetch } from '~/utils/net'

export async function getClipboardItem(accessKey: string) {
  return await jsonFetch<{ text: string }>(`${apiBaseUrl}/clipboard/item?key=${accessKey}`)
}

export async function deleteClipboardItem(accessKey: string) {
  return await fetch(`${apiBaseUrl}/clipboard/item?key=${accessKey}`, {
    method: 'DELETE',
  })
}

export async function postClipboardItem(text: string) {
  return await jsonFetch<{ key: string }>(`${apiBaseUrl}/clipboard/item`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      text,
    }),
  })
}
