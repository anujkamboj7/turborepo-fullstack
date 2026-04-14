"use client"

import { Button } from "@repo/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field"
import { useState } from "react"
import { Input } from "@repo/ui/components/input"
import { initialAuthState } from "../auth.types"
import { signupSchema } from "@repo/validation/auth"
import { authClient } from "@/lib/auth-client"
import { isAPIError } from "better-auth/api"

export default function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [state, setState] = useState(initialAuthState)
  const [pending, setPending] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)

    const formData = new FormData(event.currentTarget)
    const rawValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    }

    const parsed = signupSchema.safeParse(rawValues)
    if (!parsed.success) {
      setState({
        success: false,
        message: null,
        fieldErrors: parsed.error.flatten().fieldErrors,
        values: rawValues,
      })
      setPending(false)
      return
    }

    try {
      const { confirmPassword: _confirmPassword, ...payload } = parsed.data
      await authClient.signUp.email(payload)
      setState(initialAuthState)
      window.location.href = "/dashboard"
    } catch (error) {
      setState({
        success: false,
        message: isAPIError(error) ? error.message : "Sign up failed",
        fieldErrors: {},
        values: rawValues,
      })
      setPending(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                defaultValue={state.values?.name}
              />
              {state.fieldErrors.name && (
                <FieldError>{state.fieldErrors.name[0]}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue={state.values?.email}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
              {state.fieldErrors.email && (
                <FieldError>{state.fieldErrors.email[0]}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                defaultValue={state.values?.password}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              {state.fieldErrors.password && (
                <FieldError>{state.fieldErrors.password[0]}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                defaultValue={state.values?.confirmPassword}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {state.fieldErrors.confirmPassword && (
                <FieldError>{state.fieldErrors.confirmPassword[0]}</FieldError>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? "Creating..." : "Create Account"}
                </Button>
                <Button variant="outline" type="button" disabled={pending}>
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
