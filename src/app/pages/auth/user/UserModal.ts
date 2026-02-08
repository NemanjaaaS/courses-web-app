import type { UserData } from '../types/User';

function UserModel(data: Partial<UserData> = {}): UserData {
  const defaultData: UserData = InitialUserModel();

  return {
    ...defaultData,
    ...data,
  };
}

export function InitialUserModel(): UserData {
  return {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER',
    accountNonExpired: true,
    accountNonLocked: true,
    authorities: [
      {
        authority: 'USER',
      },
    ],
    credentialsNonExpired: true,
    enabled: true,
    fullName: '',
    username: '',
  };
}

export default UserModel;
