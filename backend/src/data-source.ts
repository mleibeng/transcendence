/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   data-source.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mleibeng <mleibeng@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/02/15 17:10:21 by mleibeng          #+#    #+#             */
/*   Updated: 2025/02/16 07:40:22 by mleibeng         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { DataSource } from "typeorm";
import { UserModel } from "./models/user.model";

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: 'database.sqlite',
    entities: [UserModel],
    synchronize: true, //set to false for production later!!
    logging: true
})

export const initDataSource = async () => {
    try {
        await AppDataSource.initialize()
    }
    catch (error) {
        console.error('Error', error)
    }
}
