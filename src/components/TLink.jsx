import { forwardRef } from 'react';
import { usePageTransition } from './PageTransition.jsx';

const EXTERNAL_RE = /^(https?:|mailto:|tel:|#|javascript:)/i;

const TLink = forwardRef(function TLink(
  { to, href, children, onClick, target, ...rest },
  ref
) {
  const dest = to ?? href;
  const { navigateWithTransition } = usePageTransition();

  const isExternal =
    !dest ||
    EXTERNAL_RE.test(dest) ||
    target === '_blank';

  const handleClick = (e) => {
    onClick?.(e);
    if (isExternal) return;
    if (e.defaultPrevented) return;
    e.preventDefault();
    navigateWithTransition(dest);
  };

  return (
    <a
      ref={ref}
      href={dest}
      target={target}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
});

export default TLink;
