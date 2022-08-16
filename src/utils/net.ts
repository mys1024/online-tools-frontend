interface JsonResponse<T = unknown> extends Omit<Response, 'arrayBuffer' | 'blob' | 'formData' | 'text'> {
  json(): Promise<T>
}

export function jsonFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<JsonResponse<T>> {
  return fetch(input, init)
}
