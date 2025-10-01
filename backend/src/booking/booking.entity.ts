import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ type: 'varchar' })
  customerName!: string;

  @Column({ type: 'varchar', nullable: true })
  customerEmail!: string | null;

  @Column({ type: 'varchar', nullable: true })
  customerPhone!: string | null;

  @Column({ type: 'varchar' })
  service!: string;

  @Column()
  appointmentDate!: Date;

  @Column({ default: false })
  isConfirmed!: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  depositAmount!: number | null;

  @Column({ default: 'pending' })
  status!: 'pending' | 'confirmed' | 'canceled' | 'no-show';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
