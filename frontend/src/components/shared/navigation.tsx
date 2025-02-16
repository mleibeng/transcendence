/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   navigation.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:11:38 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:11:39 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { Link } from 'react-router-dom'; // will replace with states
import '@styles/style.css'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Pong Game 2025
        </Link>
        <div>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;