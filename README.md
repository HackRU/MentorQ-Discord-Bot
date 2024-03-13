# MentorQ-Discord-Bot
HackRU Discord bot to facilitate a mentor queue system.

## Setup
1. Create a bot app from the Discord Dev Portal
2. Download/Clone this repo (`main` branch)
3. Create `.env` and `config.json` with appropriate values from the example files
4. Run `npm install`
5. Run `npm run deploy-cmds` to publish Discord app commands
6. Run `node .` to start the bot

## Usage
Use the `/setup` command to automatically create the necessary channels and roles (listed below). You may re-order the channels/roles and adjust settings. Do NOT change the names.

- **`@Mentor`**: Assign this role to mentors who will be reviewing and accepting mentor requests to assist participants in the hackathon.
- **`#mentorq`**: Public MentorQ channel with an info message. Users can click the `Request a mentor` button and will be prompted with a modal form to fill out.
- **`#mentorq-queue`**: Private MentorQ queue channel. When users submit mentor request forms, a message will be sent here with the data.
  - A mentor can click the `Claim` button to accept the request and open a private ticket (thread channel) between the mentor and the user. The user will be notified via DMs and pinged in the channel. The ticket will automatically archive after 24 hours of inactivity or can be locked & archived by a mentor with the `/close` command or the `Close` button. Archived tickets can be viewed in the threads list of the `#mentorq` channel.
  - The `Cancel` button can be used to reject a mentor request. This should only be used for invalid requests. The user will be notified via DMs. Once a request is canceled, it can no longer be claimed.
 
## Contributing
Contributions to this repository are welcome. Create an issue and/or open a pull request. We use ESLint to enforce a consistent coding style.

## License
MentorQ-Discord-Bot is an open-source project licensed under the [MIT License](https://github.com/HackRU/MentorQ-Discord-Bot/blob/main/LICENSE).  

Copyright (c) 2024 HackRU. Developed by Eshaan ([@DaStormer](https://github.com/DaStormer)).
