# Image Recognition Bot Sample

A sample bot that illustrates how to use the Microsoft Cutom Vision API to analyze an image from a stream or a URL and return to the user the image caption.

[![Deploy to Azure][Deploy Button]][Deploy Node/ImageRecognition]

[Deploy Button]: https://azuredeploy.net/deploybutton.png
[Deploy Node/ImageCaption]: https://azuredeploy.net

### Prerequisites

The minimum prerequisites to run this sample are:
* Latest Node.js with NPM. Download it from [here](https://nodejs.org/en/download/). Or do "npm install"
* The Bot Framework Emulator. To install the Bot Framework Emulator, download it from [here](https://emulator.botframework.com/). Please refer to [this documentation article](https://github.com/microsoft/botframework-emulator/wiki/Getting-Started) to know more about the Bot Framework Emulator.
* Custom Vision Service project ID.
* **[Recommended]** Visual Studio Code for IntelliSense and debugging, download it from [here](https://code.visualstudio.com/) for free.
* Please subscribe to Custom Vision API services and update the `MICROSOFT_PREDICTION_KEY` key in [.env](.env) file to try it out further.
* To run: "node app.js"