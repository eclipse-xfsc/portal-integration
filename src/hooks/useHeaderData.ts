import React from 'react';
import AppContext from '../store/app-context';

export interface MenuItem {
  title: string;
  id: string;
  // subitems for dropdown
  items?: MenuItem[];
  // path to internal route or external website
  path?: string;
}

const useHeaderData = (): MenuItem[] | undefined => {
  const { routes } = React.useContext(AppContext);
  const [result, setResult] = React.useState<MenuItem[]>();

  React.useEffect(() => {
    routes &&
      setResult([
        {
          title: 'header.administration',
          id: 'administrationDropdown',
          items: [
            // {
            //   title: 'header.admin-dashboard',
            //   id: 'admin-dashboard',
            //   path: '#admin-dashboard',
            // },
            {
              title: 'header.invitation',
              id: 'invitation',
              path: routes.invitation,
            },
            {
              title: 'header.claim-mapping',
              id: 'claim-mapping',
              path: routes.claimMapping,
            },
            {
              title: 'header.did-management',
              id: 'did-management',
              path: routes.didManagement,
            },
            {
              title: 'sd-wizard.banner',
              id: 'sd-wizard',
              path: routes.sdWizard,
            },
          ],
        },
        // {
        //   title: 'header.organization',
        //   id: 'organizationDropdown',
        //   items: [
        //     { title: 'header.gaiax', id: 'gaiax', path: '#gaiax' },
        //     { title: 'header.gxfs', id: 'gxfs', path: '#gxfs' },
        //   ],
        // },
        {
          title: 'header.federation',
          id: 'federationDropdown',
          items: [
            { title: 'header.services', id: 'services', path: routes.services },
            {
              title: 'header.article-and-news-management',
              id: 'article-and-news-management',
              path: routes.articleNews,
            },
            {
              title: 'header.membership',
              id: 'membership',
              path: routes.register,
            },
          ],
        },
        {
          title: 'header.analytics',
          id: 'analyticsDropdown',
          items: [
            {
              title: 'header.dashboard',
              id: 'analyticsDashboard',
              path: routes.analyticsDashboard,
            },
          ],
        },
        {
          title: 'header.notarization',
          id: 'notarizationDropdown',
          items: [
            {
              title: 'notarization.request',
              id: 'notarization-request',
              path: routes.notarizationRequest,
            },
            {
              title: 'notarization.authorization',
              id: 'notarization-authorization',
              path: routes.notarizationAuthorization,
            },
          ],
        },
        // {
        //   title: 'header.more',
        //   id: 'moreDropdown',
        //   items: [
        //     { title: 'header.news', id: 'news', path: '#news' },
        //     {
        //       title: 'header.newsletter',
        //       id: 'newsletter',
        //       path: '#newsletter',
        //     },
        //     { title: 'header.contact', id: 'contact', path: '#contact' },
        //     { title: 'header.about-gxfs', id: 'about', path: '#about' },
        //   ],
        // },
      ]);
  }, [routes]);

  return result;
};

export default useHeaderData;
