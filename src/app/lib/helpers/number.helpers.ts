const secondTicks = 10000000;
const minuteTicks = 600000000;
const hourTicks = 36000000000;
const dayTicks = 864000000000;

export class NumberHelpers {
  static pad(source: number, size: number): string {
    let s = String(source);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }

  static humanFileSize(source: number): string {
    const si = true;
    const thresh = 1024;
    if (Math.abs(source) < thresh) {
      return source + ' B';
    }
    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
      source /= thresh;
      u += 1;
    } while (Math.abs(source) >= thresh && u < units.length - 1);
    return Math.round(source) + ' ' + units[u];
  }

  static clearNumbers(input: any): string {
    // @ts-ignore
    return input
      .replace(/[\u0660-\u0669]/g, (c: any) => {
        return c.charCodeAt(0) - 0x0660;
      }) // @ts-ignore
      .replace(/[\u06f0-\u06f9]/g, (c) => {
        return c.charCodeAt(0) - 0x06f0;
      });
  }

  static format(value: number): string {
    return new Intl.NumberFormat('en-US', {
      maximumSignificantDigits: 3,
    }).format(value);
  }
}
