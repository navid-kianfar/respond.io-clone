export class DateHelpers {
  static GroupBy(source: any[], field: string): any[] {
    const groups = {} as any;
    (source || []).forEach(x => {
      const key = (x[field].toISOString ? x[field].toISOString() : x[field]).split('T')[0];
      groups[key] = groups[key] || [];
      groups[key].push(x);
    });
    return Object.keys(groups).map((date) => {
      return {
        date,
        items: groups[date]
      };
    });
  }
}
