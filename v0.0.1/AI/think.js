const { AzureOpenAI } = require("openai");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-05-01-preview";
const deployment = process.env["AZURE_DEPLOYMENT_MODEL"]; //This must match your deployment name.
require("dotenv/config");

async function main() {
  const prompt = "as a user i want to create a login page so i can login through the app. ";
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  const resultTestCase = await client.chat.completions.create({
    messages: [
    { role: "user", content: prompt+"from that user story I want to create a test case" },
    ],
    model: "",
  });

  const resultAutomationScript = await client.chat.completions.create({
    messages: [
      { role: "user", content: "I have this "+resultTestCase.choices[0].message},
      { role: "user", content: "then create the automation script in javascript using selenium-webdriver with target url localhost:3000/login.html and id username field with 'username', passoword field with 'password' and the login button with 'loginButton' then it will wait until popup alert is showed. " },
    ],
    model: "",
  });

  const fs = require('fs');
  const path = require('path');

  for (const choice of resultTestCase.choices) {
    const testcase = choice.message.content;
    const filePathTestCase = path.join(__dirname, '../Automation/Result/raw-testcase.text');

    fs.writeFile(filePathTestCase, testcase, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File has been saved as file.js');
      }
    });
  }

  for (const choice of resultAutomationScript.choices) {
    const results = choice.message.content.split('```');
    var autoscript = "";
    if (results.length > 1) {
      autoscript = results[1].replace("javascript","").replace("js","");
    } else {
      autoscript = choice.message.content;
    }
    const filePathAutoScript = path.join(__dirname, '../Automation/Result/raw-autoscript.js');

    fs.writeFile(filePathAutoScript, autoscript, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File has been saved as file.js');
      }
    });
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };