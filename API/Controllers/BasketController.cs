using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        //public async Task<ActionResult<Basket>> GetBasket()
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            //RetrieveBasket();
            // return await context.Baskets
            //                 .Include(x => x.Items)
            //                 .ThenInclude(x => x.Product)
            //                 .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);

            var basket = await RetrieveBasket();
            if (basket == null) return NoContent();
            return basket.ToDto();
            // return new BasketDto
            // {
            //     BasketId = basket.BasketId,
            //     Items = basket.Items.Select(x => new BasketItemDto
            //     {
            //         ProductId = x.ProductId,
            //         Name = x.Product.Name,    // from Product RetrieveBasket()> .ThenInclude(x => x.Product)
            //         Price = x.Product.Price,  // from Product RetrieveBasket()> .ThenInclude(x => x.Product)
            //         Brand = x.Product.Brand,  // from Product RetrieveBasket()> .ThenInclude(x => x.Product)
            //         Type = x.Product.Type,
            //         PictureUrl = x.Product.PictureUrl,
            //         Quantity = x.Quantity
            //     }).ToList()
            // };
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            basket ??= CreateBasket();

            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest("Problem adding item to basket");

            basket.AddItem(product, quantity);

            // context.SaveChangesAsync() returns number of changes
            // true if context.SaveChangesAsync() returns number of changes
            var result = await context.SaveChangesAsync() > 0;

            //return StatusCode(201);
            //CreatedAtAction create a location header, returns location header with 201
            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

            return BadRequest("Problem updating basket");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return BadRequest("Unable to retrieve basket");

            basket.RemoveItem(productId, quantity);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Problem updating basket");
        }

        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOptions);
            var basket = new Basket { BasketId = basketId };
            context.Baskets.Add(basket); // create new basket in memory
            return basket;
        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await context.Baskets
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }
    }
}