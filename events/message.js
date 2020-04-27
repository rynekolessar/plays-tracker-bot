module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) {
        return;
    }

    // Ignore messages not starting with the prefix 
    if (message.content.indexOf(client.config.prefix) !== 0){
        return;
    } 

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    // If that command doesn't exist, notify the user and do nothing
    if (!cmd) {
        message.channel.send('This command does not exist');
        return;
    }

    // Run the command
    cmd.run(client, message, args);
};