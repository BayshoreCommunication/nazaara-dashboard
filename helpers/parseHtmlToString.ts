export const parseHtmlToString = (html: any) => {
  const htmlString = html.replace(/<[^>]+>/g, "");
  return htmlString;
};
// using react html parser package you might get object as a result of parsing html string
// so convert it to only to string
