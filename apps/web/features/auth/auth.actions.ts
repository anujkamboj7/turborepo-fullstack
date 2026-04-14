"use server"

import { authClient } from "@/lib/auth-client"
import { loginSchema, signupSchema } from "@repo/validation/auth"
import { isAPIError } from "better-auth/api"
import { headers } from "next/headers"
import { z } from "zod"

export async function loginAction(prevState: any, form: FormData) {
  const rawValues = {
    email: form.get("email") as string,
    password: form.get("password") as string,
  }

  const parsed = loginSchema.safeParse(rawValues)

  if (!parsed.success) {
    const errors = z.flattenError(parsed.error)

    return {
      success: false,
      fieldErrors: errors.fieldErrors,
      message: null,
      values: rawValues,
    }
  }

  const { email, password } = parsed.data

  try {
    const requestHeaders = await headers()
    const origin =
      requestHeaders.get("origin") ??
      `${requestHeaders.get("x-forwarded-proto") ?? "http"}://${requestHeaders.get("host") ?? "localhost:3000"}`

    await authClient.signIn.email({
      email,
      password,
    }, {
      headers: {
        origin,
      },
    })

    return { success: true, fieldErrors: {}, message: null, values: {} }
  } catch (error) {
    console.log(error)

    if (isAPIError(error)) {
      return {
        success: false,
        message: error.message,
        fieldErrors: {},
        values: rawValues,
      }
    }

    return {
      success: false,
      message: "Login failed",
      fieldErrors: {},
      values: rawValues,
    }
  }
}

export async function signupAction(prevState: any, form: FormData) {
  const rawValues = {
    name: form.get("name") as string,
    email: form.get("email") as string,
    password: form.get("password") as string,
    confirmPassword: form.get("confirmPassword") as string,
  }

  const parsed = signupSchema.safeParse(rawValues)

  if (!parsed.success) {
    const errors = z.flattenError(parsed.error)

    return {
      success: false,
      fieldErrors: errors.fieldErrors,
      message: null,
      values: rawValues,
    }
  }

  const { name, email, password } = parsed.data

  try {
    const requestHeaders = await headers()
    const origin =
      requestHeaders.get("origin") ??
      `${requestHeaders.get("x-forwarded-proto") ?? "http"}://${requestHeaders.get("host") ?? "localhost:3000"}`

    await authClient.signUp.email({
      name,
      email,
      password,
    }, {
      headers: {
        origin,
      },
    })

    return { success: true, fieldErrors: {}, message: null, values: {} }
  } catch (error) {
    console.log(error)

    if (isAPIError(error)) {
      return {
        success: false,
        message: error.message,
        fieldErrors: {},
        values: rawValues,
      }
    }

    return {
      success: false,
      message: "Login failed",
      fieldErrors: {},
      values: rawValues,
    }
  }
}
