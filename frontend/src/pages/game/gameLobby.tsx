/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game_page.tsx                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/20 06:59:31 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/20 06:59:32 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import LobbySetup from '../../components/shared/LobbySetup';

const GameLobby: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen">
      <LobbySetup
        lobbyType="game"
        currentUserId={''}
        isAdmin={true}
      />
    </div>
  );
};

export default GameLobby;