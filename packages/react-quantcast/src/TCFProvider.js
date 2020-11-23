import React, { useState } from 'react';
import { useMount } from 'react-use';
import { PURPOSES } from './constants';
import { TCFContext } from './contexts';

export const getNonIABVendorConsents = () =>
  new Promise((resolve, reject) =>
    window.__tcfapi('getNonIABVendorConsents', 2, (data, success) => {
      if (!success) {
        return reject();
      }
      return resolve(data);
    }),
  );

export const TCFProvider = ({
  accountId,
  customVendorsMapping = {},
  children,
}) => {
  const [purposes, setPurposes] = useState([]);
  const [publisherPurposes, setPublisherPurposes] = useState([]);
  const [customVendors, setCustomVendors] = useState([]);

  const handleCMPEvent = async tcData => {
    const customConsents = await getNonIABVendorConsents();

    const enabledPurposes = Object.keys(tcData.purpose.consents)
      .filter(id => tcData.purpose.consents[id])
      .map(id => PURPOSES[id]);

    const publisherPurposes = Object.keys(tcData.publisher.consents)
      .filter(id => tcData.publisher.consents[id])
      .map(id => PURPOSES[id]);

    const customVendors = Object.keys(customConsents.nonIabVendorConsents)
      .filter(id => customConsents.nonIabVendorConsents[id])
      .map(id => customVendorsMapping[id]);

    setPurposes(enabledPurposes);
    setPublisherPurposes(publisherPurposes);
    setCustomVendors(customVendors);
  };

  const handleTCFReady = (tcData, success) => {
    if (!success) {
      return;
    }
    switch (tcData.eventStatus) {
      case 'tcloaded':
      case 'useractioncomplete':
        handleCMPEvent(tcData);
        break;
      default:
        break;
    }
  };

  useMount(() => {
    if (!window.__tcfapi) {
      return;
    }
    window.__tcfapi('addEventListener', 2, handleTCFReady);
    return () => window.__tcfapi('removeEventListener', 2, handleTCFReady);
  });

  return (
    <TCFContext.Provider value={{ purposes, publisherPurposes, customVendors }}>
      {children({ purposes, publisherPurposes, customVendors })}
    </TCFContext.Provider>
  );
};
