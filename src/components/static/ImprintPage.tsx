import React from 'react';
import { ContentContainer, FlexColumnContainer } from '../ui/container';

const ImprintPage = () => {
  return (
    <ContentContainer>
      <FlexColumnContainer>
        <div>
          <p>
            <strong>
              Contact data of the provider in accordance with section § 5 of the German Telemedia Act
              (Telemediengesetz/TMG):
            </strong>
          </p>
          <p>eco – Association of the Internet Industry (eco – Verband der Internetwirtschaft e.V.)</p>
          <p>
            Lichtstrasse 43h
            <br />
            50825 Cologne
            <br />
            Germany
          </p>
          <p>
            Tel: +49 (221) 7000 48 – 0<br />
            Fax: +49 (221) 7000 48 – 111
          </p>
          <p>
            E-Mail: <a href='mailto:info@eco.de'>info@eco.de</a>
            <br />
            Web:{' '}
            <a
              href='https://www.eco.de/ target='
              rel='noopener noreferrer'
            >
              https://www.eco.de/
            </a>
          </p>
          <p>
            Association Registered in Cologne, Germany
            <br />
            Association Registration Number: 14478
          </p>
          <p>
            Value Added Tax Number:
            <br />
            VAT-ID: DE 182676944
          </p>
          <p>
            <strong>The Board:</strong>
          </p>
          <p>
            Oliver Süme (Chair)
            <br />
            Klaus Landefeld (Vice Chair)
            <br />
            Felix Höger
            <br />
            Prof. Dr. Norbert Pohlmann
          </p>
          <p>
            <strong>CEO:</strong> Harald A. Summa
            <br />
            <strong>Managing Director:</strong> Alexander Rabe
          </p>
          <p>
            <strong>Responsible for content:</strong>
          </p>
          <p>Harald A. Summa</p>
          <p>
            eco – Association of the Internet Industry
            <br />
            Lichtstrasse 43h
            <br />
            50825 Cologne
            <br />
            Germany
          </p>
          <p>
            <strong>More at:</strong>
          </p>
          <ul>
            <li>
              <a href='src/components/static/ImprintPage.tsx'>Event Participation Terms and Conditions</a>
            </li>
            <li>
              <a href='https://international.eco.de/legal-notice/privacy-policy/PrivacyPage.tsx'>Privacy Policy</a>
            </li>
            <li>
              <a href='src/components/static/ImprintPage.tsx'>Terms of use for eco webpages</a>
            </li>
          </ul>
        </div>
      </FlexColumnContainer>
    </ContentContainer>
  );
};

export default ImprintPage;
