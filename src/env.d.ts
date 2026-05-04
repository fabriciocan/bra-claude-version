/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly SANITY_API_READ_TOKEN: string;
  readonly CONTACT_EMAIL: string;
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: string;
  readonly SMTP_SECURE: string;
  readonly SMTP_USER: string;
  readonly SMTP_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
