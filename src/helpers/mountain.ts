export const getMountainDifficultyColor = (difficulty: string) => {
  if (difficulty === 'easy') return 'bg-balak-500';
  if (difficulty === 'medium') return 'bg-balak-orange-500';
  if (difficulty === 'hard') return 'bg-balak-red-500';
  return 'bg-gray-400';
};

export const getMountainDifficultyText = (difficulty: string) => {
  difficulty = difficulty.toLowerCase();
  if (difficulty === 'easy') return 'Fácil';
  if (difficulty === 'medium') return 'Media';
  if (difficulty === 'hard') return 'Difícil';
  return '?';
};
