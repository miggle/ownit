// Site-wide constants. The public email is assembled at runtime (never a plain
// mailto: in source — see brief §6) by joining these two halves.
export const CALENDLY_URL = 'https://calendly.com/miggleone/ownit';
export const MIGGLE_URL = 'https://miggle.one';
export const PHONE = '+44 (0) 7748 188012';

// Brand assets — drop the files into public/ at these paths (see the README.txt
// in each folder). They render once present and stay hidden if missing.
export const ASSETS = {
  miggleLogo: '/brand/miggle-logo.svg',
  alickPhoto: '/about/alick.jpg',
};

const EMAIL_USER = 'info';
const EMAIL_DOMAIN = 'miggle.one';

/** Returns the public contact address, assembled at runtime. */
export const contactEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;

/** Opens the user's mail client without ever placing a mailto: in the markup. */
export const openMail = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
};
