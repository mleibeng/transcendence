import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserModel {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({unique: true})
    email!:string

    @Column()
    password!:string

    @Column({unique: true})
    username!:string

    @Column()
    displayName!:string

    @Column({default: 'user'})
    role!:string

    @Column({nullable: true})
    twoFASecret?: string

    @Column({default: false})
    twoFAEnabled?: boolean

    @Column({nullable: true})
    refreshToken?: string
}