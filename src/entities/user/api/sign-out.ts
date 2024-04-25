// TODO: change to the real wallet dis-connection
export const userSignOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
