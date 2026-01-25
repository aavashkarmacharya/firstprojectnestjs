@Entity()
export class cartitem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => cartentity, (cartentity) => cartentity.items)
  cart: cartentity;
  @ManyToOne(() => product)
  product: product;
  @IsNotEmpty()
  @Column()
  quantity: number;
}
