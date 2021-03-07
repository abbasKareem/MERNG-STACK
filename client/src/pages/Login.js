import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const Login = ({ history }) => {
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result)
      history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: {
      username,
      password,
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    loginUser()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
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
          label='password'
          placehoder='Password'
          type='password'
          name='password'
          value={password}
          error={errors.password ? true : false}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type='submit' primary>
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Login
