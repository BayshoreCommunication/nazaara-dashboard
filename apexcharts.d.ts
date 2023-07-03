declare module 'apexcharts/dist/apexcharts' {
    export default ApexCharts;
    export type ApexOptions = ApexCharts.ApexOptions;
  }
  
  declare class ApexCharts {
    constructor(el: HTMLElement | string | null, options: ApexCharts.ApexOptions);
    public render(): void;
    public destroy(): void;
  }
  