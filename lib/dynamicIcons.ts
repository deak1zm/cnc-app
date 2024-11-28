
import * as lucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Type for valid icon names in lucide-react
type LucideIconNames = keyof typeof lucideIcons;

// Function to get an icon component dynamically
export const getIconComponent = (iconName: string): LucideIcon | null => {
  if (iconName in lucideIcons) {
    const Icon = lucideIcons[iconName as LucideIconNames];
    return Icon as LucideIcon;
  }
  return lucideIcons.SpellCheck2; // Return null or a default icon if not found
};
