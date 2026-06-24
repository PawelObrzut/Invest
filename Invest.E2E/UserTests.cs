using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using Xunit;

namespace Invest.E2E;

public class RegisterUserTests: IDisposable
{
    private ChromeDriver driver;
    private WebDriverWait wait;

    public RegisterUserTests()
    {
        var options = new ChromeOptions();
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    }

    [Fact]
    public void UserCanRegister()
    {
        var email = $"john{Guid.NewGuid()}@example.com";

        driver.Navigate().GoToUrl("http://localhost:5173");
        driver.FindElement(By.CssSelector("[data-testid='open-login-dialog']")).Click();
        driver.FindElement(By.CssSelector("[data-testid='login-switch-to-register']")).Click();
        driver.FindElement(By.CssSelector("[data-testid='register-name']")).SendKeys("John Wick");
        driver.FindElement(By.CssSelector("[data-testid='register-email']")).SendKeys(email);
        driver.FindElement(By.CssSelector("[data-testid='register-password']")).SendKeys("secretPassword123");
        driver.FindElement(By.CssSelector("[data-testid='register-confirm-password']")).SendKeys("secretPassword123");
        driver.FindElement(By.CssSelector("[data-testid='register-submit']")).Click();

        wait.Until(d =>
        {
            var el = d.FindElement(By.CssSelector("[data-testid='login-email']"));
            
            Console.WriteLine(el.GetAttribute("outerHTML"));
            Console.WriteLine($"value = '{el.GetAttribute("value")}'");
            Console.WriteLine($"text = '{el.Text}'");

            return el.GetAttribute("value") == email;
        });

        var emailInput = driver.FindElement(By.CssSelector("[data-testid='login-email']"));
        Console.WriteLine(emailInput);
        Assert.Equal(email, emailInput.GetAttribute("value"));
    }

    public void Dispose()
    {
        driver.Quit();
        driver.Dispose();
    }
}