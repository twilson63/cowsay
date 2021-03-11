# Deno with Vercel

Vercel has created a zero config serverless platform, by adding files in an api folder you create api endpoints, no need for a server framework or listen to port command, you just need to bring your functions. 🚀

Deno is the new typescript/javascript runtime from the NodeJS creator Ryan Dahl. The runtime has new features that create a more secure environment. Deno has several coding tools built in, like a test runner, linter and even a typescript compiler. One of the most controversial attributes it the ability to pull code from a url. Deno removes itself from the need to use a second client to install third party code, instead Deno leverages the the url system of the internet. 🦕

The team at Vercel has created a runtime for Deno. Let’s create a serverless api with Deno and launch it on Vercel.

> If you are just kicking the tires and don’t want to install vercel and deno locally, you can use Gitpod. Gitpod is an online code IDE that gives you a sandbox per code repository. Simply, fork this repository [https://github.com/hyper63/gitpod-deno-template](https://github.com/hyper63/gitpod-deno-template) and launch it in Gitpod with the Gitpod extension [https://chrome.google.com/webstore/detail/gitpod-dev-environments-i/dodmmooeoklaejobgleioelladacbeki?hl=en](https://chrome.google.com/webstore/detail/gitpod-dev-environments-i/dodmmooeoklaejobgleioelladacbeki?hl=en)

#### Installing Deno

Deno ships as a single executable with no dependencies, this makes the install process straight forward: see [https://deno.land](https://deno.land) for more information about your platform. If you are on a Mac you can run:

Shell (Mac, Linux)

```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Windows Powershell

```
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Need more options: [https://github.com/denoland/deno\_install](https://github.com/denoland/deno_install)

#### Setting up Vercel

Vercel is a platform as service that focuses on static generated web sites and serverless api functions. Built to host JAM stack applications, Javascript, APIS, and Markup.

To signup you will need an account from either Github, Gitlab, or Bitbucket, these services are code repositories and Vercel is able to create continuous delivery pipelines from any of these services. Once you have your code repository account, go to the Vercel signup page and login with your account. [https://vercel.com/signup](https://vercel.com/signup) follow the steps to create your free personal account.

> To use Vercel locally, you will need NodeJS and NPM installed, follow the instructions here to install the CLI — [https://vercel.com/download](https://vercel.com/download)

{% youtube aAfLN2qFkYM %}

#### Getting started

So, now that we have all of our setup complete, it is now time to decide what kind of API are we going to build? Hmm! Let’s build a COWSAY API, COWSAY is a program that takes some text as input and returns an ASCII rendering of a cow with a bubble enclosing the text.

```
_______
< hello >
 -------
        \ ^__^
         \ (oo)\ _______
            (__)\ )\/\
                ||----w |
                || ||
```

In our API, we will create two endpoints:

- GET / — returns a welcome message with a cow
- POST /say — allows the client to send a JSON body with some text and type of animal.

Sound like fun?

#### Setup project

Ok, let’s do this!

Open a local terminal or console

Create a new folder on your local machine called cowsay

```
mkdir cowsay
cd cowsay
```

In this directory, we want to create a vercel.json file. This file will allow us to specify the Deno runtime for our functions.

```
{
  "functions": {
    "api/**/*.[jt]s": { "runtime": "vercel-deno@0.7.7" }
  }
}
```

> At the time of this writing, the current version of the vercel-deno runtime was 0.7.7. You will want to check the repository to confirm the latest version: [https://github.com/TooTallNate/vercel-deno](https://github.com/TooTallNate/vercel-deno)

#### Create GET / endpoint

Now that we have the configuration out of the way, we can create our first endpoint.

Create a new folder called api and in that folder create a new file called index.ts.

```
mkdir api
touch api/index.ts
```

Open index.ts in your code editor

```
import { ServerRequest } from 'https://deno.land/std@0.89.0/http/server.ts'

export default (req: ServerRequest) => req.respond({
  body: 'Hello World'
})
```

We will import the ServerRequest type from the http/server module in Deno. Then we will export a default function that received the ServerRequest object from Vercel when the / path is requested. Vercel maps any index file to the root / path of the api. So by naming the file index we specify that we want this function to be invoked when the client requests the root / path. In Deno, there is no second object passed in. The ServerRequest object has a method called respond this method takes a Response Object. This object should contain a body property, but also can contain a status and a headers property. You can see the interface declaration here:

```
/**
 * Interface of HTTP server response.
 * If body is a Reader, response would be chunked.
 * If body is a string, it would be UTF-8 encoded by default.
 */
export interface Response {
  status?: number;
  headers?: Headers;
  body?: Uint8Array | Deno.Reader | string;
  trailers?: () => Promise<Headers> | Headers;
}
```

[Deno - A secure runtime for JavaScript and TypeScript](https://deno.land/std@0.89.0/http/server.ts#L388)

Now, that we defined our new endpoint, save the file and lets start the local Vercel dev server. First lets make sure the Vercel CLI is installed:

```
npm i -g vercel
```

Next, login to your account using the CLI

```
vercel login
```

Enter your email address and then go to your email client and click verify, this will connect your client to your Vercel account.

Finally, we can launch the dev environment by typing:

```
vercel dev
```

When you press enter, you will be prompted with a couple of questions:

```
Vercel CLI 21.3.3 dev (beta) — https://vercel.com/feedback
? Set up and develop “/workspace/cowsay”? [Y/n] y
? Which scope should contain your project? tom-personal
? Link to existing project? [y/N] n
? What’s your project’s name? cowsay
? In which directory is your code located? ./
No framework detected. Default Project Settings:
- Build Command: `npm run vercel-build` or `npm run build`
```

You should be able to accept all of the default settings, by just clicking enter.

Finally, you should see the following:

```
Vercel CLI 21.3.3 dev (beta) — https://vercel.com/feedback
> Ready! Available at [http://localhost:3000](http://localhost:3000)
```

✨ Yay! ✨ you should be running a serverless environment locally with Deno.

Let’s confirm, open up a browser to this url [https://localhost:3000/api](https://localhost:3000/api) and you should see ‘Hello World’.

#### What does the COWSAY?

Now that we have our server working, let’s create a new endpoint to accept a JSON document and return a cow.

We will be using this curl command to test our new endpoint.

```
curl -X POST localhost:3000/api/say -d '{"text": "Cows Rock!" }' -H 'Content-Type: application/json'
```

Create a new file in the api folder called say.ts

```
import { ServerRequest } from '../deps.ts'

export default (req: ServerRequest) => {

}
```

And lets create a dependency file so that we don’t have to type urls all over the place. Create this file in your project root directory and call it deps.ts

```
export { ServerRequest } from 'https://deno.land/std@0.89.0/http/server.ts'
```

#### Parsing the body of a request

The first thing we need to with the say endpoint is parse the body of the request. We can do this by using the Deno readAll method and decoding the request body to a string with a TextDecoder.

In the say file add the following lines of code:

```
import { ServerRequest } from '../deps.ts'

export default async (req: ServerRequest) => {
  const body = new TextDecoder().decode(await Deno.readAll(req.body))
  console.log(body)
  req.respond({ body })
}
```

You may notice that we changed the function to an async function and we are using the await command to handle the promise returned from Deno.readAll, then we are decoding the data into text. We log out the text and and we respond in kind of an echo server.

#### Creating the cow

Now that we have the text coming in, we need to create the cow using the COWSAY module.

The COWSAY module is a third party module that is located on the deno.land site. We will need to import the module into our app. Open the deps.ts file and lets add the following:

```
export { say } from 'https://deno.land/x/cowsay@1.1/mod.ts'
```

And in the api/say.ts file lets add the following code:

```
import { ServerRequest, say } from '../deps.ts'

export default async (req: ServerRequest) => {
  const body = new TextDecoder().decode(await Deno.readAll(req.body))
  console.log(say({ text: "hello" }))
  req.respond({ body })
}
```

We import the say command from deps.ts

And we add a log command to confirm that the say command is working.

#### Convert body text to JS Object

Now we need to convert the body text to a JS Object using the JSON parse method.

```
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
```

We use a try catch to handle any errors generated from the parsing of JSON.

#### Run curl command

```
curl -X POST localhost:3000/api/say -d '{"text": "Cows Rock!" }' -H 'Content-Type: application/json'

____________
< Cows Rock! >
 ------------
   \ ^__^
    \ (oo)\ _______
       (__)\ )\/\
           ||----w |
           || ||
```

And you should get your cow!

#### Deploy

In order to deploy your api, just type vercel in the terminal and your api will build and deploy on the vercel platform!

#### Summary

In this article, we took a look at both Vercel and Deno, two technologies that are changing the way we deliver value to users. If you want to check out the final product online: [https://cowsay.vercel.app/api](https://cowsay.vercel.app/api)

And here is the code repository: [https://github.com/twilson63/cowsay](https://github.com/twilson63/cowsay)