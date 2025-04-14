using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;
 
    public AuthService(
 
      UserManager<ApplicationUser> userManager,
      RoleManager<IdentityRole> roleManager,
      IConfiguration configuration,
      ApplicationDbContext context)
 
    {
      _userManager = userManager;
      _roleManager = roleManager;
      _configuration = configuration;
      _context = context;
    }
 
 
 
    public async Task<(int, string)> Registration(User model, string role)
    {
      var existingUser = await _userManager.FindByEmailAsync(model.Email);
      if (existingUser != null)
      {
        return (0, "User already exists");
      }
      ApplicationUser user = new ()
      {
        UserName = model.Username,
        SecurityStamp = Guid.NewGuid().ToString(),
        Email = model.Email,
        Name = model.Username.Length>30?model.Username.Substring(0,30):model.Username,
        PhoneNumber = model.MobileNumber
      };
      var result = await _userManager.CreateAsync(user, model.Password);
      if (!result.Succeeded)
      {
        return (0, "User creation failed! Please check user details and try again");
      }
 
      if (!await _roleManager.RoleExistsAsync(role))
      {
        await _roleManager.CreateAsync(new IdentityRole(role));
      }

      var newUser = new User
      {
        Email = model.Email,
        Password = model.Password,
        Username = model.Username,
        MobileNumber = model.MobileNumber,
        UserRole = role
      };

      await _context.Users.AddAsync(newUser);
      await _context.SaveChangesAsync();

      await _userManager.AddToRoleAsync(user, role);

      return (1, "User created successfully!");
    }

public async Task<(int, string)> Login(LoginModel model)
{
    var user = await _userManager.FindByEmailAsync(model.Email);
    if (user == null)
    {
        return (0, "Invalid email");
    }

    var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
    if (!isPasswordValid)
    {
        return (0, "Invalid password");
    }

    var userRoles = await _userManager.GetRolesAsync(user);
    var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    foreach (var role in userRoles)
    {
        authClaims.Add(new Claim(ClaimTypes.Role, role));
    }

    var token = GenerateToken(authClaims);

    return (1, token); // Returning status code and the token as a tuple
}
    private string GenerateToken(IEnumerable<Claim> claims)
 
    {
 
      var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
      var token = new JwtSecurityToken(
        issuer: _configuration["JWT:ValidIssuer"],
        audience: _configuration["JWT:ValidAudience"],
        expires: DateTime.Now.AddHours(3),
        claims: claims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
      );
      return new JwtSecurityTokenHandler().WriteToken(token);
 
    }
    }
}