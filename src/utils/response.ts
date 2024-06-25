export const responseStatuses = (method: string) => {
  let status = 200;
  switch (method) {
  case 'POST':
    status = 201;
    break;
  case 'DELETE':
    status = 202;
    break;
  default:
    status = 200;
    break;
  }
  return status;
};