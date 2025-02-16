/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth_page.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:58 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:11:58 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import Login from '../../components/auth/login';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;