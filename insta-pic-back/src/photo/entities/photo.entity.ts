import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, GeneratedCreationDate } from "typeorm";

@Entity('photos')
export class Photo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    url:string;

    @GeneratedCreationDate()
    creationDate:Date;

    @ManyToOne(
        () => User,
        user => user.posts
    )
    user: User;


}