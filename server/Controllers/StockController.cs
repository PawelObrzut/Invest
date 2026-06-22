using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

using server.DTOs;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/stocks")]
public class StockController : ControllerBase
{
    private readonly IStockService _marketService;

    public StockController(IStockService marketService)
    {
        _marketService = marketService;
    }

  [Authorize]
  [HttpGet("quotes")]
    public async Task<IActionResult> GetQuotes([FromQuery] string[]? symbols)
    {
        var quotes = await _marketService.GetQuotesAsync(symbols);

        return Ok(new ServerResponse<List<StockResponse>>
        {
            Success = true,
            Message = "Quotes fetched successfully",
            Data = quotes ?? new List<StockResponse>()
        });
    }

    [Authorize]
    [HttpGet("quotes/{symbol}/history")]
    public async Task<IActionResult> GetQuoteHistory(
        [FromRoute] string symbol,
        [FromQuery] TimePeriod period = TimePeriod.Week)
    {
        var stockHistory = await _marketService.GetStockHistoryAsync(symbol, period);

        return Ok(new ServerResponse<List<StockResponse>>
        {
            Success = true,
            Message = "Stock History fetched successfully",
            Data = stockHistory ?? new List<StockResponse>()
        });
    }
}

