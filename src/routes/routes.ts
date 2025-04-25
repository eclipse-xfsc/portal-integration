export interface Route {
  [key: string]: string;
}

const routes: Route = {
  root: '/',
  imprint: '/imprint',
  privacy: '/privacy',
  settings: '/settings',
  contact: '/contact',
  help: '/help',
  login: '/login',
  register: '/register',
  registerPrincipal: '/register/principal',
  claimMapping: '/claim-mapping',
  articleNews: '/article-news',
  didManagement: '/did-management',
  notarizationRequest: '/notarization/request',
  notarizationAuthorization: '/notarization/authorization',
  analyticsDashboard: '/analytics/dashboard',
  invitation: '/invitation',
  services: '/services',
  sdWizard: '/sd-wizard',
};

export default routes;
