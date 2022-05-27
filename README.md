<p align="center">
	<img src="amethyst.png" width="30%">
</p>
<h1 align="center">Amethyst</h1>
<h3 align="center">A beautiful discord music bot</h3>

Amethyst is meant to be a clean beautiful music bot for discord, built around the ideas of simplicity and ease of use.

Amethyst is also open source so you can host your own versions of it.

## Adding the community version to your server
Adding the already deployed version to your server. Is simple as 1,2,3,4,5
1. click the bot adding link: [here](https://discord.com/api/oauth2/authorize?client_id=974030969256411157&permissions=397317107024&scope=bot%20applications.commands)
2. Choose the server to add to
3. Click Continue
4. Authorize it
5. Go to the server and run `/help`

### Downside to using community version
- Sometime shutdowns for maintenance, testing and upgrading
- not always up to date
- Slower on average (depends on the distance between hot servers and discord servers)

It is recommended to deploy your own unless you are not a developer.
## Deploying your own instance
Deploying your own bot instance is simple as hosting it on any cloud provider.

### Prerequisites
- Node LTS (This was tested on Node 16)
- FFMPEG is installed (you can also run `npm install ffmpeg-static` in the root of the project)
- Setup discord bot from the [discord developer dashboard](https://discord.com/developers/), there are many tutorials on how to setup a bot online
- Environment Variables
	- `TOKEN: <Bot Token>`
	- `CLIENT_ID: <The application id>`
	- `GUILD: <the specific server to deploy commands to>` Optional

### Env alternative
An alternative to using environment variables is using a config file. Create a `config.json` in the root folder, and use this template bellow and fill out the correct values.
```json
{
	"token": "bot-token",
	"clientId": "app-id",
	"guild": "server-id"
}
```
### Running it
Simply install all the dependencies with `npm install`.

To deploy the slash commands, run: `npm run deploy-commands`

To run the standalone bot, run: `npm run bot`

To deploy commands and run the bot in one command, run: `npm start` 

### Deploying Using Docker
There is a Docker file provided, so just build the image and run the container in the root of the project, provide ENV Variables(or use the [env alternative](#env-alternative)) and it should work.

## License
This bot is under [TCI](https://github.com/imagineeeinc/Amethyst/blob/main/LICENSE) License.