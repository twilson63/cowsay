import { ServerRequest, say } from '../deps.ts'

export default async (req: ServerRequest) => {
  try {
    const body = new TextDecoder().decode(await Deno.readAll(req.body))
    const cow = say(JSON.parse(body))
    req.respond({ body: cow })
  } catch (e) {
    req.respond({ status: 500, body: 'could not parse body' })
  }
}