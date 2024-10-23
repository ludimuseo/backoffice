import Input from '@/components/input'
import EnvelopeIcon from '@/assets/icons/EnvelopeIcon'
import LockIcon from '@/assets/icons/lockIcon'
import { type FC, useState, type ChangeEvent } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { auth } from '@/firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6).max(20),
})

type schemaType = z.infer<typeof schema>

const SignIn: FC<HTMLFormElement> = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const [inputValues, setInputValues] = useState<schemaType>({
    email: '',
    password: '',
  })
  const { email, password }: schemaType = inputValues

  const onSignIn = (data: FieldValues) => {
    if (!data.email || !data.password) return
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.info('/// LOGGED IN')
      })
      .catch((error) => {
        console.info('/// ERROR')
      })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputValues((prev: schemaType) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <form
        id="form-signin"
        onSubmit={(event) => void handleSubmit(onSignIn)(event)}>
        {/* Input Email */}
        <Input
          uid="signin-email"
          label="Email"
          placeholder="My Email"
          type="text"
          {...register('email')}
          name="email"
          value={email}
          onChange={handleChange}>
          {{
            icon: <EnvelopeIcon />,
            error: <>{errors.email && <p>{errors.email.message}</p>}</>,
          }}
        </Input>

        {/* Input Password */}
        <Input
          uid="signin-password"
          label="Password"
          placeholder="My Password"
          type="password"
          {...register('password')}
          name="password"
          value={password}
          onChange={handleChange}>
          {{
            icon: <LockIcon />,
            error: <>{errors.password && <p>{errors.password.message}</p>}</>,
          }}
        </Input>

        {/* Button Submit */}
        <button type="submit">SUBMIT</button>
      </form>
    </>
  )
}

export default SignIn