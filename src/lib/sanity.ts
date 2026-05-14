import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const token = import.meta.env.SANITY_API_READ_TOKEN;

const isValidProjectId = projectId && /^[a-z0-9-]+$/.test(projectId);

export const sanityClient = isValidProjectId
  ? createClient({
      projectId,
      dataset,
      token,
      useCdn: false,
      apiVersion: '2024-01-01',
    })
  : null;
