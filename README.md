# repohár térkép / re-cup map

## Contribution

For **content** issues, please go to the [website](https://repoharterkep.hu) and click 'új hely' (add new place) or 'Visszajelzés' (general feedback).

For features and bug fixes, read on.

### Running the app locally

#### You will need a Vercel account to run this app locally. It’s not scary though!

1. Sign up or log in to [Vercel](https://vercel.com).
2. Install their CLI
3. From your terminal, type `vercel login` and follow their instructions.

#### Grab environment variables.

Project owner will send them to you on [Discord](https://discord.com/channels/1009105077300109463/). Trouble joining? Email `repoharterkep` at `pm.me`.

#### Clone the project and run it locally

```sh
cp .env.example .env
```
Populate `.env` with the tokens you got in the previous step.

```sh
yarn && vercel dev
```

That’s it, you should be ready to roll! Submit your PR when ready.
