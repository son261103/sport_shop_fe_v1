// 🎯 Main Types Export for Sport Shop

// Theme types
export type {
  ThemeMode,
  ColorPalette,
  ThemeConfig,
  ThemeContextType,
} from "./theme";

// UI types
export type {
  ButtonVariant,
  ButtonSize,
  ButtonConfig,
  BadgeVariant,
  AnimationClass,
} from "./ui";
export { ANIMATION_CLASSES } from "./ui";

// Sport types
export type { SportCategory, CategoryConfig, Product, CartItem } from "./sport";

// Auth types
export type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  AuthError,
  AuthState,
  ValidationErrors,
  AuthFormData,
  AuthFormErrors,
} from "./auth";

// Location types
export type {
  Province,
  District,
  Ward,
  LocationSelectOption,
  ProvinceApiResponse,
  DistrictApiResponse,
} from "./location";
