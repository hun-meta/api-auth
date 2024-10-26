import { Entity, PrimaryColumn, Column, Index, DeleteDateColumn } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity('users_medicalwallet')
export class UsersMedicalWallet extends CommonEntity {
    @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'userId' })
    user_id: string; // keep it string to process 64bit int

    @Column({ type: 'varchar', length: 20, unique: true })
    account: string;

    @Column({ type: 'varchar', length: 64 })
    password: string;

    @Index('users_medicalwallet_mobile_IDX')
    @Column({ type: 'varchar', length: 11, nullable: true })
    mobile: string | null;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'date' })
    dob: Date;

    @Column({ type: 'varchar', length: 1 })
    sex_code: string;

    @DeleteDateColumn({ type: 'datetime', precision: 6, nullable: true })
    deleted_at: Date | null;
}
