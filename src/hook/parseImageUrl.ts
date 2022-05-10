export const parseImageUrl = (url: string, dim?: string): string => {
  if (url) {
    if (url?.includes('s1.moc.gov.kh')) {
      return url;
    }

    let parsedUrl = url?.split('/mocspace/');
    if (dim && parsedUrl.length > 1) {
      return parsedUrl[0].concat('/', dim, '/mocspace/', parsedUrl[1]);
    }

    return url;
  } else {
    return '';
  }
};
