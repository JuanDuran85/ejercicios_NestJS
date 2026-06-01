export const getServicesConfig = () => {

  return {
    workflows: {
      baseUrl: process.env.WORKFLOWS_SERVICE_URL || 'http://workflows-service:3001',
    },
  };
};

export const servicesConfig = getServicesConfig();
