import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Banner from '../ui/Banner';
import { ContentContainer, FlexColumnContainer } from '../ui/container';
import { BannerMode } from '../ui/UI-model';

import '../../sd-wizard/runtime';
import '../../sd-wizard/polyfills';
import '../../sd-wizard/main';
import '../../sd-wizard/styles.css';

/**
 * Instruction
 * Install in angular project
 *  ng add @angular/elements
 * In Angular Module implement DoBootstrap
 *
 *  export class AppModule implements DoBootstrap {
 *     constructor(private injector: Injector) {
 *       const webComponent = createCustomElement(AppComponent, { injector: this.injector });
 *       customElements.define('angular-component', webComponent);
 *     }
 *
 *     ngDoBootstrap() { }
 *   }
 *
 * Copy files:
 *  cp /Users/bialask/CODE/GXFS/sd-creation-wizard-frontend/implementation/dist/* /Users/bialask/CODE/GXFS/portal-integration/src/sd-wizard/
 *
 */
const SDWizardPage = () => {
  const { t } = useTranslation();

  const getSDWizardComponent = () => {
    // @ts-ignore
    return <sd-wizard></sd-wizard>;
  };

  return (
    <>
      <ContentContainer className='row-gap-2'>
        <Banner
          mode={BannerMode.NOTARIZATION_REQUEST}
          title={t('sd-wizard.banner')}
        />
        <FlexColumnContainer className='row-gap-1'>
          <h2>{t('sd-wizard.banner')}</h2>
          {getSDWizardComponent()}
        </FlexColumnContainer>
      </ContentContainer>
    </>
  );
};

export default SDWizardPage;
