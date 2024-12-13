import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('exhibits')
export class Exhibit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photoName: string;

  @Column({ type: 'text' })
  uzText: string;

  @Column({ type: 'text' })
  ruText: string;

  @Column({ type: 'text' })
  enText: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  uzAudioName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ruAudioName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  enAudioName: string;

  @ManyToOne(() => User, (user) => user.exhibits)
  createdBy: User;

  @Column({ type: 'int' })
  createdById: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deletedBy: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @Column({ type: 'int', default: 0 })
  shotTimes: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
