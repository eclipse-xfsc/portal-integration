import React, { ReactElement } from 'react';

export interface RouteMapping {
  path: string;
  element: ReactElement;
  requiredClaim?: string;
}
