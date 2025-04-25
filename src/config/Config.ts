export interface ClaimMappings {
  [key: string]: string;
}

export interface Oidc {
  authority: string;
  client_id: string;
  scope: string;
  response_type: string;
  realm: string;
  redirectUri: string;
}

export default interface Config {
  claimMappings: ClaimMappings;
  claimServiceBaseUrl: string;
  oidc: {
    internal: Oidc;
    external: Oidc;
  };
}
