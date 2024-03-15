# app-chinnam-generator

app-chinnam-generator is an npm package that simplifies the process of generating various app icons for Android and iOS applications from a single source image. With app-chinnam-generator, you can quickly create icon sets tailored for different device resolutions and platform requirements.

## Installation

You can install app-chinnam-generator via npm:

```bash
npm install app-chinnam-generator
```

## Usage

To generate app icons using `app-chinnam-generator`, follow these steps:

1. Include a source image (e.g., `icon.png`) in your project directory.
2. Use the following code snippet to generate icons:

```javascript
const generateIcons = require('app-chinnam-generator');

// Generate Android icons
generateIcons({
    imageURL: 'https://fastly.picsum.photos/id/728/200/200.jpg?hmac=ewJNfbVjP_8FUokKp00XS9m2FOzyZbpNE5rG97r7cdw',
    android: {
        launcher: true,
        notification: true
    }
});
