import { UAParser } from 'ua-parser-js';
export function GenerateMerchantOrderID(depositId: number, userId: number) {
    return `DEP-${userId}-${depositId}-${Date.now()}`;
  }

export function parseUserAgent(userAgentString: string) {
  const parser = new UAParser(userAgentString);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();
  
  return {
    browser: `${browser.name} ${browser.version}`,
    os: `${os.name} ${os.version}`,
    device: device.vendor ? `${device.vendor} ${device.model}` : 'Desktop'
  };
}
