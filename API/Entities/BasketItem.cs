using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
  [Table("BasketItems")]
  public class BasketItem
  {
    public int Id { get; set; } 
    public int Quantity { get; set; }

    // navigation properties, 
    public int ProductId { get; set; } 
    // one to one relationship with the product
    // we don't have to create the product properties in the BasketItems table
    public required Product Product { get; set; }

    //fully relationship
    public int BasketId { get; set; }
    //a busket item has one to one relationship with a basket
    
    // we don't have to create the basket properties in the BasketItems table
    public Basket Basket { get; set; } = null!;
  }
}