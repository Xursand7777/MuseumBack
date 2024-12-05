import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import {Role} from "../../../common/constants/roles.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string; // Password should be hashed

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.Admin], // Default role can be set to Student
    })
    roles: Role[]; // A single role for each user

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
