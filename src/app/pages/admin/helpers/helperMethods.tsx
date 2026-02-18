export const mapCategory = (category: string) => {
  switch (category) {
    case 'PROGRAMMING':
      return 'Programming';
    case 'DATA_SCIENCE':
      return 'Data Science';
    case 'DESIGN':
      return 'Design';
    case 'DEVOPS':
      return 'DevOps';
    case 'SECURITY':
      return 'Security';
    default:
      return 'Programming';
  }
};
