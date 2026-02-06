import type { User } from '../../../../lib/mockData';

function UserModel(data: Partial<User> = {}): User {
  const defaultData: User = InitialUserModel();

  return {
    ...defaultData,
    ...data,
  };
}

export function InitialUserModel(): User {
  return {
    id: '',
    name: '',
    email: '',
    role: 'user',
    joinedAt: '',
    status: 'active',
    enrolledCourses: 0,
    completedTests: 0,
  };
}

export default UserModel;
