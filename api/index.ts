import { ServerRequest } from '../deps.ts'

export default (req: ServerRequest) => req.respond({
  body: `Cowsay API - Using Deno
< hello >
 -------
   \   ^__^
    \  (oo)\_______
       (__)\       )\/\
           ||----w |
           ||     ||`})
