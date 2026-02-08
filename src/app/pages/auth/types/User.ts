export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: [
    {
      authority: 'ADMIN' | 'USER';
    },
  ];
  credentialsNonExpired: boolean;
  enabled: boolean;
  fullName: string;
  username: string;
}
