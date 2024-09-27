import {
    Entity,
    PrimaryColumn,
    Column,
    Unique,
    Index,
    DeleteDateColumn,
  } from 'typeorm';
import { CommonEntity } from './common.entity';
  
  @Entity('users_medicalwallet')
  @Unique('users_medicalwallet_unique_1', ['account'])
  @Unique('users_medicalwallet_unique_3', ['address'])
  @Unique('users_medicalwallet_unique_4', ['contract'])
  @Index('users_medicalwallet_mobile_IDX', ['mobile'], { unique: false })
  export class UsersMedicalWallet extends CommonEntity{
    @PrimaryColumn('binary', { length: 16 })
    userId: Buffer; // 유저 고유 ID(uuid)
  
    @Column({ type: 'varchar', length: 20 })
    account: string; // 로그인 계정
  
    @Column({ type: 'varchar', length: 64 })
    password: string; // 비밀번호
  
    @Column({ type: 'varchar', length: 11, nullable: true })
    mobile: string | null; // 휴대폰번호
  
    @Column({ type: 'varchar', length: 30 })
    name: string; // 이름
  
    @Column({ type: 'date' })
    dob: Date; // 생년월일
  
    @Column({ type: 'varchar', length: 1 })
    sexCode: string; // 주민등록증 성별 구분 코드
  
    @Column({ type: 'varchar', length: 42, nullable: true })
    address: string | null; // 블록체인 주소
  
    @Column({ type: 'varchar', length: 42, nullable: true })
    contract: string | null; // 블록체인 컨트랙트 주소
  
    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt: Date | null; // 데이터가 삭제된 일자(soft delete)
  }
  