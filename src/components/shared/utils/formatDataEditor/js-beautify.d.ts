declare module "js-beautify" {
  export function js_beautify(code: string, options?: any): string;
  export function html_beautify(code: string, options?: any): string;
  export function css_beautify(code: string, options?: any): string;
}
