import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const Register = ({ history }) => {
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result)
      history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: {
      username,
      email,
      password,
      confirmPassword,
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    addUser()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label='username'
          placehoder='Username'
          type='text'
          name='username'
          value={username}
          error={errors.username ? true : false}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          label='email'
          placehoder='Email'
          type='email'
          name='email'
          value={email}
          error={errors.email ? true : false}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label='password'
          placehoder='Password'
          type='password'
          name='password'
          value={password}
          error={errors.password ? true : false}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Input
          label='confirm password'
          placehoder='cofirmPassword'
          type='password'
          name='cofirmPassword'
          value={confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type='submit' primary>
          Regsiter
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Register
