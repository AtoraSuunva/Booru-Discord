# Booru Bot

Search 15 different boorus directly from within Discord!

## [Add to Server](https://canary.discord.com/api/oauth2/authorize?client_id=204721731162734592&permissions=0&scope=bot%20applications.commands)

[Support Server](https://discord.gg/8K3uCfb) - [Privacy Policy](./privacy.md) - [Terms of Service](./tos.md)

## **Features:**

- Tag/Site blacklist (server-wide and personal per-user lists)
- NSFW in age-restricted channels **only** (See below on how to opt-in for DMs or opt-out for servers)
- Support for 15 sites
- Ability to randomly search all sites until you get a result
- Configurable minimum score a post needs to be shown! Filter out posts with a negative score!
- Uses fancy embeds!
- Previous/Next buttons to look through all the results (up to 100!)
- "Hide post" ❌ button to hide the image if it's... not great!
- Search privately with ephemeral results! "Post Publicly" button once you find what you want to show everyone!
- Open source!

Use `/search` for the main bot functionality, and use `/config` and `/blacklist` to manage the bot

## **Opting into NSFW**

By default, NSFW results (posts not rated `safe`) are *only* shown in age-restricted channels, not anywhere else (including DMs).

If you want to **opt-out** of NSFW results *anywhere* on your server, run `/config set allow_nsfw allow:False` (You will need "Manage Messages" permissions or an override)

If you want to **opt-in** to NSFW results *in DMs*, run `/config set allow_nsfw allow:True` in a DM with the bot

NSFW results will **never** be posted in non age-restricted channels, regardless of your settings. If you want NSFW results in a channel, mark it age-restricted.

> ⚠️ NSFW filtering depends on the rating the booru gave the post. There is always a chance someone marked the post wrong and you get a non-safe post.

## **Managing the blacklist**

> ℹ️ Running these commands in-server will manage that server's blacklist, while running them in-DM will manage your *personal* blacklist.
> When you search in a server, the server blacklist and your personal blacklist are merged together to filter the results

Use the `/blacklist` command to view/edit/delete the blacklist. See the subcommands for what exactly you can do. You'll need "Manage Messages" to use these commands.

Use `/view blacklist` to view the blacklist without any permissions.

---

## FAQ

### Can you add support/alias for (site)?

Booru support is done using the [booru](https://github.com/AtoraSuunva/booru) package. I maintain that package so you are welcome to suggest (or even implement yourself) sites to support. (Preferably open an [issue on booru](https://github.com/AtoraSuunva/booru/issues/new), but I can forward requests there as well)

### I have a bug report/idea/feedback/etc

You can submit it either as an [issue here](https://github.com/AtoraSuunva/BooruBot/issues/new) or on the [Support Server](https://discord.gg/8K3uCfb)

### Can I use/fork this code?

It's MIT licensed, go for it

---

## Selfhosting

> ⚠️ ***I make no guarantees about anything if you selfhost the bot.*** You *will* be on your own. I might help you if you're stuck, but **I do not officially provide support for selfhosting.** Don't do this unless you know what you're doing. You revoke all right to complain if something goes wrong when you selfhost if you selfhost.

You can either run the bot via the pre-built Docker image, Docker, or installing the dependencies yourself.

### Pre-built Docker image

A pre-built image is available from [GitHub](https://github.com/AtoraSuunva/BooruBot/pkgs/container/boorubot), currently building off the latest main commit.

Create a `docker-boorubot.yml` (or whatever name you want):

```yml
version: '3.7'
services:
  bot:
    image: 'ghcr.io/atorasuunva/boorubot'
    restart: always
    init: true
    env_file:
      - .env
    volumes:
      - boorubot-db:/home/node/app/prisma/db

volumes:
  boorubot-db:
```

Then run it via `docker compose -f docker-boorubot.yml`. This avoids needing to clone the repo and wait for builds. A `docker run` will work as well, but require copy-pasting the command to keep the config.

> Currently, the activities files `activities-booru.txt` etc are baked into the image. You can't change the activities without needing to rebuild the image. Someday I'll change it, but it's pretty low priority.

### Docker

If you prefer/need to re-build the image (ie. you've changed the code), you can use the provided `docker-compose.yml` and `docker compose up -d --build` to handle it all for you.

### Installing dependencies yourself

You'll need Node.js (I think at least v18, but I only test using v20), pnpm, patience, and prayers.

Assuming you have Node.js and pnpm installed and working:

```sh
# Install dependencies (*should* generate prisma client)
pnpm install

# Either
pnpm build
pnpm start:prod
# Or, doing both steps in 1 command
pnpm start:dev
```

---

### License

It's MIT, so you can fork the bot, host your own private copy, etc. You just need to keep a copy of the license and copyright notice around.
