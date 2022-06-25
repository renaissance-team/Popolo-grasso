export type locationType = {
  latitude: number;
  longitude: number;
};
export default async () => new Promise<locationType>((res, rej) => {
  try {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        res(position.coords);
      },
      (error) => {
        rej(error);
      }
    );
  } catch (error) {
    rej(error);
  }
});
