export interface IUpdateUserParams {
  userId: string;
  updateData: { email?: string; username?: string; password?: string };
}
