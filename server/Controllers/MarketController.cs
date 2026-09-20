using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Invest.Api.Services;

namespace Invest.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MarketController : ControllerBase
{
    private readonly IMarketService _marketService;

    public MarketController(IMarketService marketService)
    {
        _marketService = marketService;
    }

    [HttpGet("quotes")]
    public async Task<IActionResult> GetQuotes(
        CancellationToken cancellationToken)
    {
        var symbols = new[]
        {
            "AAPL",
            "MSFT",
            "NVDA",
            "GOOGL"
        };

        var quotes = await _marketService.GetQuotesAsync(
            symbols,
            cancellationToken);

        return Ok(new
        {
            success = true,
            message = "Market quotes retrieved successfully.",
            data = quotes,
            errors = Array.Empty<string>()
        });
    }

    [HttpGet("{symbol}/history")]
    public async Task<IActionResult> GetHistory(
        string symbol,
        CancellationToken cancellationToken)
    {
        var history = await _marketService.GetHistoryAsync(
            symbol.ToUpperInvariant(),
            cancellationToken);

        return Ok(new
        {
            success = true,
            message = "Market history retrieved successfully.",
            data = history,
            errors = Array.Empty<string>()
        });
    }
}