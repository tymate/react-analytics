# gatsby-plugin-quantcast
Adds the Quantcast Choice API to your Gatsby site.

## Install

Using yarn:
```
yarn add @tymate/gatsby-plugin-quantcast
```

## How to use
```es6
// In your gatsby-config.js
plugins: [
  {
    resolve: '@tymate/gatsby-plugin-quantcast',
    options: {
      // Specify your Quantcast Account ID from the
      // Quantcast UI header, without the "p-" prefix.
      accountId: 'YOUR_QUANTCAST_ACCOUNT_ID',

      // Optionaly force your website hostname to match
      // a registered domain in the Quantcast UI.
      host: 'mywebsite.com',
    }
  }
]
```