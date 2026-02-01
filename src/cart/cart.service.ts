import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { cartentity } from './cart.entity';
import { cartitem } from './cart-item.entity';
import { product } from 'src/product/products.entity';
import { AddToCartDto } from './addtocartdto';
import { userservice } from '../user/user.service';
import { create } from 'node:domain';
import type { CartDeletionDto } from './cartdeletion.dto';
import { user } from 'src/user/user.entity';

@Injectable()
export class cartservice {
  constructor(
    @InjectRepository(cartentity)
    private CartRepo: Repository<cartentity>,
    @InjectRepository(cartitem)
    private CartItemRepo: Repository<cartitem>,
    @InjectRepository(product)
    private ProductRepo: Repository<product>,
    private readonly userservice: userservice,
  ) {}
  async addToCart(userid: number, dto: AddToCartDto) {
    const cart = await this.CartRepo.findOne({
      where: { user: { id: userid } },
      relations: ['items', 'items.product'],
    });

    const user = await this.userservice.getuserbyid(userid);
    if (!user) {
      throw new NotFoundException('no user found');
    }
    if (!cart) {
      const product = await this.ProductRepo.findOne({
        where: { productid: dto.productid },
      });
      /*if (!product) {
        throw new NotFoundException('no product found');
    }*/
      const createcart = this.CartRepo.create({
        user: { id: userid } as any,
      });
      return this.CartRepo.save(createcart);
    }

    const cartitem = await this.CartItemRepo.findOne({
      where: {
        cart: { cartid: cart.cartid },
        product: { productid: dto.productid },
      },
    });
    if (cartitem) {
      //product already exists in the cart
      cartitem.quantity += dto.productquantity;
      return await this.CartItemRepo.save(cartitem);
    } else {
      //product doesnt exit in cart
      const newcartitem = this.CartItemRepo.create({
        cart: { cartid: cart.cartid },
        product: { productid: dto.productid },
        quantity: dto.productquantity,
      });
      return this.CartItemRepo.save(newcartitem);
    }
  }
  async getcart(userid: number) {
    const cart = await this.CartRepo.findOne({
      where: {
        user: { id: userid },
      },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException('cart is empty');
    }
    const usercart = cart.items.map((usercart) => ({
      quantity: usercart.quantity,
      products: {
        productid: usercart.product.productid,
        productname: usercart.product.productname,
        discription: usercart.product.discription,
        price: usercart.product.price,
        total_price: usercart.product.price * usercart.quantity,
      },
    }));
    return { cartid: cart.cartid, usercart };
  }
  async deletefromcart(userid: number, dto: CartDeletionDto) {
    const cart = await this.CartRepo.findOne({
      where: {
        user: { id: userid },
      },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException('cart is empty!');
    }
    const cartitem = await this.CartItemRepo.findOne({
      where: {
        cart: { cartid: cart.cartid },
        product: { productid: dto.productid },
      },
    });
    if (!cartitem) {
      throw new NotFoundException('product not in cart');
    }
    if (cartitem.quantity > 1) {
      while (dto.quantity < cartitem.quantity) {
        cartitem.quantity -= dto.quantity;
        return await this.CartItemRepo.save(cartitem);
      }
    }

    return this.CartItemRepo.remove(cartitem);
  }
}
