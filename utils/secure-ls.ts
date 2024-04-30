import SecureLS from 'secure-ls';

export const qhSecuredLS = new SecureLS({
  encodingType: 'des',
  encryptionSecret: import.meta.env.SECURE_SL,
});
