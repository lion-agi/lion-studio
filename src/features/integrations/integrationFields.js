// Common fields for all integration types
const commonFields = {
  id: {
    type: 'string',
    required: true,
    description: 'Unique identifier for the integration',
  },
  name: {
    type: 'string',
    required: true,
    description: 'Name of the integration',
  },
  description: {
    type: 'string',
    required: false,
    description: 'Description of the integration',
  },
  type: {
    type: 'string',
    required: true,
    description: 'Type of integration (e.g., "database", "api", "cloud")',
  },
  status: {
    type: 'string',
    required: true,
    description: 'Current status of the integration (e.g., "Connected", "Disconnected")',
  },
  createdAt: {
    type: 'date',
    required: true,
    description: 'Date and time when the integration was created',
  },
  updatedAt: {
    type: 'date',
    required: true,
    description: 'Date and time when the integration was last updated',
  },
};

// Specific fields for different integration types
const specificFields = {
  database: {
    host: {
      type: 'string',
      required: true,
      description: 'Hostname or IP address of the database server',
    },
    port: {
      type: 'number',
      required: true,
      description: 'Port number for the database connection',
    },
    databaseName: {
      type: 'string',
      required: true,
      description: 'Name of the database to connect to',
    },
  },
  api: {
    baseUrl: {
      type: 'string',
      required: true,
      description: 'Base URL for the API',
    },
    authType: {
      type: 'string',
      required: true,
      description: 'Authentication type (e.g., "Bearer", "Basic", "OAuth")',
    },
  },
  cloud: {
    provider: {
      type: 'string',
      required: true,
      description: 'Cloud provider name (e.g., "AWS", "Google Cloud", "Azure")',
    },
    region: {
      type: 'string',
      required: true,
      description: 'Cloud region for the integration',
    },
  },
};

// Function to create an integration schema
const createIntegrationSchema = (type, additionalFields = {}) => {
  const baseSchema = { ...commonFields };
  const typeSpecificFields = specificFields[type] || {};
  
  return {
    ...baseSchema,
    ...typeSpecificFields,
    ...additionalFields,
  };
};

export { commonFields, specificFields, createIntegrationSchema };