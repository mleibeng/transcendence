import { DataSource } from "typeorm";
import { UserModel } from "./types/user.types";

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
