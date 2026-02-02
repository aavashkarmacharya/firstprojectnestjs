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
import { MESSAGES } from '@nestjs/core/constants';

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
    let cart = await this.CartRepo.findOne({
      where: { user: { id: userid } },
      relations: ['items', 'items.product'],
    });

    const user = await this.userservice.getuserbyid(userid);
    if (!user) {
      throw new NotFoundException('no user found');
    }

    if (!cart) {
      const usercart = await this.CartRepo.save(
        this.CartRepo.create({
          user: { id: userid } as any,
        }),
      );
      cart = usercart;
    }
    if (cart) {
      const cartitem = await this.CartItemRepo.findOne({
        where: {
          cart: { cartid: cart.cartid },
          product: { productid: dto.productid },
        },
      });
      if (cartitem) {
        //product already exists in the cart

        cartitem.quantity += dto.productquantity;
        await this.CartItemRepo.save(cartitem);
        return {
          userid: userid,

          productid: dto.productid,
          productquantity: cartitem.quantity,
        };
      } else {
        //product doesnt exit in cart
        const newcartitem = this.CartItemRepo.create({
          cart: { cartid: cart.cartid },
          product: { productid: dto.productid },
          quantity: dto.productquantity,
        });
        await this.CartItemRepo.save(newcartitem);
        return {
          userid: userid,
          productid: dto.productid,
          productquantity: dto.productquantity,
        };
      }
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
    const usercart = cart.items.map((cartdata) => ({
      userid: userid,
      quantity: cartdata.quantity,
      product: {
        productid: cartdata.product.productid,
        productname: cartdata.product.productname,
        discription: cartdata.product.discription,
        price: cartdata.product.price,
        total_price: cartdata.product.price * cartdata.quantity,
      },
    }));
    return { usercart };
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
      if (dto.quantity < cartitem.quantity) {
        cartitem.quantity -= dto.quantity;
        return await this.CartItemRepo.save(cartitem);
      }
    }
    await this.CartItemRepo.remove(cartitem);

    return { message: 'item has been removed from the cart' };
  }
}
