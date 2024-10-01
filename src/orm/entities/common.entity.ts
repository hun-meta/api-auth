import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity extends BaseEntity {
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    insertedAt: Date; // 데이터가 생성된 일자

    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date; // 데이터가 마지막으로 업데이트된 일자
}
