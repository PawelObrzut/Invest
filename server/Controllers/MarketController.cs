using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

using server.DTOs;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/market")]
public class MarketController : ControllerBase
{
    private readonly IMarketService _marketService;

    public MarketController(IMarketService marketService)
    {
        _marketService = marketService;
    }

  [Authorize]
  [HttpGet("quotes")]
    public async Task<IActionResult> GetQuotes([FromQuery] string[]? symbols)
    {
        var quotes = await _marketService.GetQuotesAsync(symbols);

        return Ok(new ServerResponse<List<MarketResponse>>
        {
            Success = true,
            Message = "Quotes fetched successfully",
            Data = quotes ?? new List<MarketResponse>()
        });
    }
}
