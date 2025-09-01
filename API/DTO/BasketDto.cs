using System;

namespace API.DTO;

public class BasketDto
{
  public required string BasketId { get; set; }
  public List<BasketItemDto> Items { get; set; } = []; //busket has relationship with a busket item

}
