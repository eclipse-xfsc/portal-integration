import React from 'react';
import ClaimMappingPage from '../components/claim-mapping/ClaimMappingPage';
import ArticleNews from '../components/article-news/ArticleNews';
import DidManagement from '../components/did-management/DidManagement';
import NotarizationRequest from '../components/notarization/NotarizationRequest';
import NotarizationAuthorization from '../components/notarization/NotarizationAuthorization';
import AppContext from '../store/app-context';
import { RouteMapping } from '../routes/routeMappings';
import ImprintPage from '../components/static/ImprintPage';
import PrivacyPage from '../components/static/PrivacyPage';
import Landing from '../components/landing/Landing';
import Placeholder from '../components/placeholder/Placeholder';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import RegisterLogin from '../login/RegisterLogin';
import RegisterPrincipal from '../components/register-principal/RegisterPrincipal';
import Invitation from '../components/invitation/Invitation';
import { Route } from 'react-router-dom';
import ServicePage from '../components/service/Service';
import SDWizardPage from '../components/sd-wizard/SDWizardPage';

const useRouteMappings = (): RouteMapping[] => {
  const { routes } = React.useContext(AppContext);
  const registerPrincipalPage = (
    <RegisterLogin>
      <RegisterPrincipal />
    </RegisterLogin>
  );

  return [
    // Business routes
    { path: routes.claimMapping, element: <ClaimMappingPage />, requiredClaim: 'claim-mapping' },
    { path: routes.articleNews, element: <ArticleNews />, requiredClaim: 'articles' },
    { path: routes.didManagement, element: <DidManagement />, requiredClaim: 'did-management' },
    { path: routes.notarizationRequest, element: <NotarizationRequest />, requiredClaim: 'notarization-request' },
    {
      path: routes.notarizationAuthorization,
      element: <NotarizationAuthorization />,
      requiredClaim: 'notarization-process',
    },
    { path: routes.invitation, element: <Invitation />, requiredClaim: 'invitation' },
    {
      path: routes.analyticsDashboard,
      element: <Placeholder text='Analytics Dashboard' />,
      requiredClaim: 'analytics-dashboard',
    },
    { path: routes.services, element: <ServicePage />, requiredClaim: 'service' },
    { path: routes.sdWizard, element: <SDWizardPage />, requiredClaim: 'sd-wizard' },
    // Open routes
    { path: routes.root, element: <Landing /> },
    { path: routes.login, element: <Login /> },
    { path: routes.register, element: <Register /> },
    { path: routes.registerPrincipal, element: registerPrincipalPage },
    { path: routes.imprint, element: <ImprintPage /> },
    { path: routes.privacy, element: <PrivacyPage /> },
    // Phantom routes
    { path: routes.settings, element: <Placeholder text='settings' /> },
    { path: routes.contact, element: <Placeholder text='contact' /> },
    { path: routes.help, element: <Placeholder text='help' /> },
  ];
};

export default useRouteMappings;
