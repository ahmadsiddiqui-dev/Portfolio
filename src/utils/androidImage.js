// Android-only cover-image swap. Chrome on Android evicts decoded bitmaps
// when they go off-screen, which makes large parallax covers re-decode on
// every scroll-back and read as "image stops between scrolls". Pass the
// full-quality src plus a pre-shrunk android src, and this returns the
// android one only when running on Android.

export const isAndroid =
  typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '');

export const androidImage = (src, androidSrc) => (isAndroid ? androidSrc : src);
