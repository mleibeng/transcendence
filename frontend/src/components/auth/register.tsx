/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   register.tsx                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:24 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/17 01:53:12 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React, { useState } from 'react';
import '@styles/style.css'
import FormInput from '../shared/form_input';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('')
  const [, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords don\'t match')
      return
    }

    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, username, displayName}),
        credentials: 'include'
    })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
      alert('Registered successfully')
    } catch (error) {
      console.error('Registration failed', error)
      alert('Registration failed')
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Register</h2>
        <FormInput
          label='Email'
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label='Username'
          type='username'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormInput
          label='Display Name'
          type='displayname'
          id='displayname'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <FormInput
          label='Password'
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormInput
          label='ConfirmPassword'
          type='confirmPassword'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;