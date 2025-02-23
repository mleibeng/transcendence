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
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold no-underline">
          Pong Game 2025
        </Link>
        <div>
          <Link to="/profile" className="text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:bg-blue-700">
            Profile
          </Link>
          <Link to="/profile/statistics" className="text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:bg-blue-700">
            Stats
          </Link>
          <Link to="/tournament" className="text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:bg-blue-700">
            Tournament
          </Link>
          <Link to="/matchmaking" className="text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:bg-blue-700">
            Find Match
          </Link>
          <Link to="/login" className="text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:bg-blue-700">
            Login
          </Link>
          <Link to="/register" className="text-white px-4 py-2 rounded-md text-sm font-medium no-underline hover:bg-blue-700">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

// once logged in I will remove login + register links later and replace log in with log out

export default Navbar;