export type AuthState = {
  success: boolean
  message: string | null
  fieldErrors: Record<string, string[] | undefined>
  values: Record<string, string>
}

export const initialAuthState: AuthState = {
  success: false,
  message: null,
  fieldErrors: {},
  values: {},
}
