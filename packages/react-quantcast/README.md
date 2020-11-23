# React Quantcast

A React provider to retrieve privacy and consent settings from an installed Quantcast Choice tag.

It integrates with the [Consent Manager Platform API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md), which is an [IAB](https://iabeurope.eu/) standard to manage privacy settings.

## Installation

Using yarn :
```es6
yarn add @tymate/react-quantcast
```

## Reference

### `<TCFProvider />`
`TCFProvider` integrates with the Quantcast CMP API to retrieve purposes allowed by the user and custom non-IAB vendors consent.

It takes the following properties :
- `customVendorsMapping`, an optional object mapping custom vendor IDs defined in the Quantcast Choice interface to arbitrary strings.

The provider must wrap a children function having this signature
```es6
({purposes, customVendors}) => {}
```

Its parameter keys are :
- `purposes`, an object mapping purposes asked by the website and the boolean value of user consent. This object can be passed to Google Tag Manager to define which purposes have been consented to.
  ```es6
  {
    "purpose.content_performance": false,
    "purpose.improve_products": true
  }
  ```
- `consentPurposes`, an array of purposes consented by the user.
- `publisherPuproses`, an array of purposes enabled in the Quantcast interface.
- `customVendors`, an array of custom vendors enabled by the user.

```es6
import { TCFProvider, CONTENT_PERFORMANCE } from '@tymate/react-quantcast';
import { includes } from 'lodash';

<TCFProvider
  customVendorsMapping={{
    1: 'vendor.facebook',
    2: 'vendor.google_analytics',
  }}>
  {({ consentPurposes, customVendors }) => (
    <>
      {includes(consentPurposes, CONTENT_PERFORMANCE) && (
        <div>Content performance enabled, activating Google Analytics</div>
      )}
      {includes(customVendors, 'vendor.facebook') && (
        <div>Activating Google Pixel</div>
      )}
    </>
  )}
</TCFProvider>
```

### `TCFContext`
`TCFContext` is a context having the same values as the object passed by `<TCFProvider />` to its children function.

```es6
import React, { useContext } from 'react';
import { TCFContext, CONTENT_PERFORMANCE } from '@tymate/react-quantcast';

const Analytics = () => {
  const { consentPurposes } = useContext(TCFContext);

  return (
    <>
      {includes(consentPurposes, CONTENT_PERFORMANCE) && (
        <div>Content performance enabled</div>
      )}
    </>
  )
}
```

### Constants
The library includes a bunch of constants you can use to reference TCF purposes.

The provided constants are :

- `STORE_DATA`
- `BASIC_ADS`
- `ADS_PROFILING`
- `TARGETED_ADS`
- `CONTENT_PROFILING`
- `TARGETED_CONTENT`
- `AD_PERFORMANCE`
- `CONTENT_PERFORMANCE`
- `MARKET_RESEARCH`
- ` IMPROVE_PRODUCTS`

The library also exports a `PURPOSES` constant, which is a mapping between purposes IDs from Quantcast and their corresponding constants.

### References
- [Consent Manager Platform API](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md), the standard specification of the underlying API.
- [Quantcast Choice CMP reference](https://help.quantcast.com/hc/en-us/articles/360047078534-Choice-CMP2-CCPA-API-Index-TCF-v2-0-), documents the implementation and additions of the IAB API by Quantcast.