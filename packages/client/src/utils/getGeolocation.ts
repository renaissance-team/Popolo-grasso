export default async () => new Promise((res, rej) => {
  try {
    navigator.geolocation.getCurrentPosition((position) => {
      res(position.coords);
    });
  } catch (error) {
    rej(error);
  }
});
