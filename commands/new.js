exports.run = (client, message, args) => {

    const playchannel = client.channels.cache.get('704083835113046058');

    const filter = m => m.author.id === message.author.id;
    message.channel.send("What is the stock's ticker symbol?")
        .then(() => {
            message.channel.awaitMessages(response => message.content, {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                })
                .then((collected) => {
                    ticker = collected.first().content;

                    message.channel.send("Is this a Call or Put?")
                        .then(() => {
                            message.channel.awaitMessages(response => message.content, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time'],
                                })
                                .then((collected) => {
                                    optionType = collected.first().content.toLowerCase();
                                    if (optionType.valueOf().trim() === "put") {} else if (optionType.valueOf().trim() === "call") {} else {
                                        return message.reply("Option type must be either a call or put.");
                                    }

                                    message.channel.send("Are you buying or selling this position?")
                                        .then(() => {
                                            message.channel.awaitMessages(response => message.content, {
                                                    max: 1,
                                                    time: 30000,
                                                    errors: ['time'],
                                                })
                                                .then((collected) => {
                                                    buyOrSell = collected.first().content.toLowerCase();

                                                    message.channel.send("What is the strike price for this option play?")
                                                        .then(() => {
                                                            message.channel.awaitMessages(response => message.content, {
                                                                    max: 1,
                                                                    time: 30000,
                                                                    errors: ['time'],
                                                                })
                                                                .then((collected) => {
                                                                    strikePrice = collected.first().content;

                                                                    message.channel.send("What is the option premium that you are executing the trade at?")
                                                                        .then(() => {
                                                                            message.channel.awaitMessages(response => message.content, {
                                                                                    max: 1,
                                                                                    time: 30000,
                                                                                    errors: ['time'],
                                                                                })
                                                                                .then((collected) => {
                                                                                    cost = collected.first().content;

                                                                                    message.channel.send("What type of trade are you looking to make: Day, Swing, Earnings, Other?")
                                                                                        .then(() => {
                                                                                            message.channel.awaitMessages(response => message.content, {
                                                                                                    max: 1,
                                                                                                    time: 30000,
                                                                                                    errors: ['time'],
                                                                                                })
                                                                                                .then((collected) => {
                                                                                                    length = collected.first().content;

                                                                                                    message.channel.send("What is the risk level for this trade? (0-10)")
                                                                                                        .then(() => {
                                                                                                            message.channel.awaitMessages(response => message.content, {
                                                                                                                    max: 1,
                                                                                                                    time: 30000,
                                                                                                                    errors: ['time'],
                                                                                                                })
                                                                                                                .then((collected) => {
                                                                                                                    risk = collected.first().content;
                                                                                                                    if (risk > 10) {
                                                                                                                        return message.reply("Risk level cannot be greater than 10.");
                                                                                                                    }

                                                                                                                    message.channel.send("Do you have any other notes to include?")
                                                                                                                        .then(() => {
                                                                                                                            message.channel.awaitMessages(response => message.content, {
                                                                                                                                    max: 1,
                                                                                                                                    time: 60000,
                                                                                                                                    errors: ['time'],
                                                                                                                                })
                                                                                                                                .then((collected) => {
                                                                                                                                    notes = collected.first().content;

                                                                                                                                    playchannel.send({embed : {
                                                                                                                                        color: 4388251,
                                                                                                                                        title: "New Staff play by " + message.author.username,
                                                                                                                                        fields: [{
                                                                                                                                                name: "Stock / Ticker",
                                                                                                                                                value: "$" + ticker,
                                                                                                                                                inline: true
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                name: "Call/Put",
                                                                                                                                                value: "" + optionType,
                                                                                                                                                inline: true
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                name: "Strike Price",
                                                                                                                                                value: "$" + strikePrice,
                                                                                                                                                inline: true
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                name: "Option Cost",
                                                                                                                                                value: "$" + cost,
                                                                                                                                                inline: true
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                name: "Length",
                                                                                                                                                value: '' + length,
                                                                                                                                                inline: true
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                name: "Risk Level",
                                                                                                                                                value: risk + "/10",
                                                                                                                                                inline: true
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                name: "Notes",
                                                                                                                                                value: "" + notes
                                                                                                                                            },
                                                                                                                                        ],
                                                                                                                                        timestamp: new Date(),
                                                                                                                                        footer: {
                                                                                                                                            icon_url: client.user.avatarURL,
                                                                                                                                            text: "Hype Club Trading"
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    });
                                                                                                                                })
                                                                                                                                .catch(() => {
                                                                                                                                    message.channel.send("Time ran out.")
                                                                                                                                    return;                                                                                                                                    return;
                                                                                                                                })
                                                                                                                        })
                                                                                                                })
                                                                                                                .catch(() => {
                                                                                                                    message.channel.send("Time ran out.")
                                                                                                                    return;
                                                                                                                })

                                                                                                        })
                                                                                                })
                                                                                                .catch(() => {
                                                                                                    message.channel.send("Time ran out.")
                                                                                                    return;
                                                                                                })

                                                                                        })
                                                                                })
                                                                                .catch(() => {
                                                                                    message.channel.send("Time ran out.")
                                                                                    return;
                                                                                })

                                                                        })
                                                                })
                                                                .catch(() => {
                                                                    message.channel.send("Time ran out.")
                                                                    return;
                                                                });
                                                        });
                                                })
                                                .catch(() => {
                                                    message.channel.send("Time ran out.")
                                                    return;
                                                });
                                        })
                                })
                                .catch(() => {
                                    message.channel.send("Time ran out.")
                                    return;
                                });
                        });
                })
                .catch(() => {
                    message.channel.send("Time ran out.")
                    return;
                });
        });
};