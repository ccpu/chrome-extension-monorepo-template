import { siteBaseUrls } from '../src/public-urls';

async function loadAppConfig(nodeEnv: string) {
  vi.stubEnv('NODE_ENV', nodeEnv);
  vi.resetModules();
  const { appConfig } = await import('../src/app-config-public');
  return appConfig;
}

describe('appConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should serve the local dev host over http in development', async () => {
    const appConfig = await loadAppConfig('development');

    expect(appConfig.isDev).toBe(true);
    expect(appConfig.siteUrl).toBe(`http://${siteBaseUrls.dev}`);
  });

  it('should serve the production host over https outside development', async () => {
    const appConfig = await loadAppConfig('production');

    expect(appConfig.isDev).toBe(false);
    expect(appConfig.siteUrl).toBe(`https://${siteBaseUrls.prod}`);
    expect(appConfig.ogImage).toBe(`https://${siteBaseUrls.prod}/og.png`);
  });
});
