export class StringHelpers {
  static readonly dot = '...';
  static readonly emptyGuid = '00000000-0000-0000-0000-000000000000';

  static format(input: string, args: any[]): string {
    return input.replace(/{(\d+)}/g, (match, num) => {
      return typeof args[num] !== 'undefined' ? String(args[num]) : match;
    });
  }

  static truncate(input: string, limit: number, middle: boolean): string {
    input = input || '';
    if (input.length < limit) {
      return input;
    }
    if (!middle) {
      return input.substring(0, limit - 3) + this.dot;
    }
    const mid = Math.round(limit / 2);
    return (
      input.substring(0, mid) + this.dot + input.substring(limit - mid - 3)
    );
  }

  static toKebabCase(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  static trimLeft(input: string, charList: string): string {
    if (charList === undefined) {
      charList = 's';
    }

    return (input || '').replace(new RegExp('^[' + charList + ']+'), '');
  }

  static trimRight(input: string, charList: string): string {
    if (charList === undefined) {
      charList = 's';
    }

    return (input || '').replace(new RegExp('[' + charList + ']+$'), '');
  }

  static trim(input: string, charList: string): string {
    return this.trimLeft(this.trimRight(input, charList), charList);
  }

  static insert(input: string, index: number, patch: string): string {
    if (index === 0) {
      return `${patch} ${input || ''}`.trim();
    }
    return `${input.substring(0, index)} ${patch} ${input.substr(index)}`;
  }

  static cleanTrim(input: string): string {
    let result = (input || '');
    result = this.trim(result, '\r\n');
    result = this.trim(result, '\n');
    result = this.trim(result, '\r');
    return result.trim();
  }
}
