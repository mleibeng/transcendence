/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:12:16 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/15 17:12:17 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import ReactDOM from 'react-dom/client'
import './styles/style.css'
import App from "./App"

const rootElement = document.getElementById('root')

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<App />)
} else {
    console.error("root element missing in index.html")
}
