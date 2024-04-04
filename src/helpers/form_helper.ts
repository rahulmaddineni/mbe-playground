const permissions = [
  "manage_business_extension",
  "ads_management",
  "ads_read",
  "business_management",
  "catalog_management",
  "email",
  "instagram_basic",
  "instagram_manage_comments",
  "instagram_manage_insights",
  "instagram_manage_messages",
  "leads_retrieval",
  "pages_manage_cta",
  "pages_manage_ads",
  "pages_manage_engagement",
  "pages_manage_instant_articles",
  "pages_manage_metadata",
  "pages_manage_posts",
  "pages_messaging",
  "pages_read_engagement",
  "pages_read_user_content",
  "pages_show_list",
  "public_profile",
  "publish_video",
  "read_insights",
  "whatsapp_business_management",
  "whatsapp_business_messaging",
];

export const permissionOptions = permissions.map((p) => ({
  label: p,
  value: p,
  isFixed: p === "manage_business_extension",
}));

export const getScopeFromPermissionOptions = (permissionOptions) =>
  permissionOptions.map((option) => option.value).join(",");
