import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
  } from "next-sanity";
  
  
  
  const config = {
    projectId: "7prargez",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: false,
  };
  
  export const sanityClient = createClient(config);
  
  export const usePreviewSubscription = createPreviewSubscriptionHook(config);
  
  export const urlFor = (source) => createImageUrlBuilder(config).image(source);
  
  
  