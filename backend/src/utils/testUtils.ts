export async function testDelay(time: number) {
  return new Promise(async(resolve, reject) => 
    setTimeout(() => resolve(true), time)
  );
}