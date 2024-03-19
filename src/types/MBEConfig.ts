export enum BusinessVertical {
  ECOMMERCE,
  APPOINTMENTS,
  RESERVATIONS,
  FOOD_AND_DRINK,
  CREATIVE,
  ADS_TARGETING,
  LEAD_ADS,
  MEASUREMENT_AND_OPTIMIZATION,
}

export enum MBEFlow {
  ADS_MINIMAL,
  CATALOG_ADS,
  CHECKBOX_PLUGIN,
  CHECKBOX_PLUGIN_MARKETING,
  COMMERCE,
  COMMERCE_OFFSITE,
  CONVERSIONS_API,
  CONVERSIONS_API_MINIMAL,
  CREATIVE,
  CREATIVE_WITH_ASSETS,
  CUSTOM_AUDIENCE,
  CUSTOMER_DATA,
  DEFAULT,
  FB_SERVICES,
  FEED,
  AR_COMMERCE,
  IG_CREATORS_AS_SELLERS,
  LEAD_ADS,
  MARKETPLACE,
  MESSENGER_CHAT,
  MESSENGER_MARKETING,
}

export enum MBECtaButtonText {
  BOOK_NOW = "Book Now",
  BUY_NOW = "Buy Now",
  RESERVE = "Reserve",
  ORDER_FOOD = "Order Food",
}

export enum PageCardSeeAllText {
  SEE_ALL = "See All",
}

export enum PageCardCtaButtonText {
  BOOK,
}

export type MBEConfig = {
  extras: MBEExtrasConfig;
};

export type MBEExtrasConfig = {
  setup: MBEExtrasSetup;
  business_config: MBEExtrasBusinessConfig;
  repeat: boolean;
};

export type MBEExtrasSetup = {
  external_business_id: string;
  timezone: string;
  currency: string;
  business_vertical: BusinessVertical;
  domain?: string;
  channel?: MBEFlow;
  business_manager_id?: string;
  ad_account_id?: string;
  page_id?: string;
  ig_profile_id?: string;
  pixel_id?: string;
  catalog_id?: string;
  flow_config: MBEFlowConfigData;
};

export type MBEExtrasBusinessConfig = {
  business: MBEBusinessPropertiesConfigData;
  messenger_chat?: MBEMessengerChatConfigData;
  catalog_feed_scheduled?: MBECatalogFeedConfigData;
  page_cta?: MBEPageCtaConfigData;
  page_card?: MBEPageCardConfigData;
  ig_cta?: MBEIGCtaConfigData;
  messenger_menu?: MBEMessengerMenuConfigData;
  thread_intent?: MBEThreadIntentConfigData;
};

export type MBEMessengerChatConfigData = {
  enabled: boolean;
  domains: string[];
};

export type MBECatalogFeedConfigData = {
  enabled: boolean;
  feed_url: string;
};

export type MBEPageCtaConfigData = {
  enabled: boolean;
  cta_button_text: MBECtaButtonText;
  cta_button_url: string;
  below_button_text: string;
};

export type MBEPageCardConfigData = {
  enabled: boolean;
  see_all_text: PageCardSeeAllText;
  see_all_url: string;
  cta_button_text: PageCardCtaButtonText;
};

export type MBEIGCtaConfigData = {
  enabled: boolean;
  cta_button_text: MBECtaButtonText;
  cta_button_url: string;
};

export type MBEMessengerMenuConfigData = {
  enabled: boolean;
  cta_button_text: MBECtaButtonText;
  cta_button_url: string;
};

export type MBEThreadIntentConfigData = {
  enabled: boolean;
  cta_button_url: string;
};

export type MBEBusinessPropertiesConfigData = {
  name: string;
};

export type MBEFlowConfigData = {
  use_minimal_onboarding?: boolean;
};
