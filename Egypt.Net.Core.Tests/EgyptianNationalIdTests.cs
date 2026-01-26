using Egypt.Net.Core.Exceptions;

namespace Egypt.Net.Core.Tests;

public class EgyptianNationalIdTests
{
    [Fact]
    public void Constructor_WithValidNationalId_ShouldCreateObject()
    {
        var nationalIdValue = "30101011234567";

        var nationalId = new EgyptianNationalId(nationalIdValue);

        Assert.NotNull(nationalId);
    }

    [Fact]
    public void BirthDate_ShouldBeParsedCorrectly_FromNationalId()
    {
        var nationalIdValue = "30101011234567";
        var expectedBirthDate = new DateTime(2001, 01, 01);

        var nationalId = new EgyptianNationalId(nationalIdValue);

        Assert.Equal(expectedBirthDate, nationalId.BirthDate);
    }

    [Fact]
    public void Gender_ShouldBeFemale_WhenSerialLastDigitIsEven()
    {
        var nationalIdValue = "30101011234568";

        var nationalId = new EgyptianNationalId(nationalIdValue);

        Assert.Equal(Gender.Female, nationalId.Gender);
    }

    [Fact]
    public void Gender_ShouldBeMale_WhenGenderDigitIsOdd()
    {
        var nationalIdValue = "30101011234577";

        var nationalId = new EgyptianNationalId(nationalIdValue);

        Assert.Equal(Gender.Male, nationalId.Gender);
    }

    [Fact]
    public void Constructor_ShouldThrowInvalidNationalIdFormatException_WhenNationalIdIsTooShort()
    {
        var invalidNationalId = "123";

        Assert.Throws<InvalidNationalIdFormatException>(() =>
        {
            new EgyptianNationalId(invalidNationalId);
        });
    }

    [Fact]
    public void Governorate_ShouldBeCairo_WhenCodeIs01()
    {
        var id = new EgyptianNationalId("30101010123456");

        Assert.Equal(Governorate.Cairo, id.Governorate);
    }

    [Fact]
    public void Constructor_ShouldThrowInvalidGovernorateCodeException_WhenGovernorateCodeIsInvalid()
    {
        var invalidId = "30101019999999";

        Assert.Throws<InvalidGovernorateCodeException>(() =>
        {
            new EgyptianNationalId(invalidId);
        });
    }

    [Fact]
    public void Age_ShouldBeCalculatedCorrectly_ForKnownBirthDate()
    {
        var id = new EgyptianNationalId("30001010123456"); // 01/01/2000

        Assert.True(id.Age >= 24);
    }

    [Fact]
    public void IsAdult_ShouldBeTrue_WhenAgeIs18OrMore()
    {
        var id = new EgyptianNationalId("30001010123456");

        Assert.True(id.IsAdult);
    }

    [Fact]
    public void TryCreate_ShouldReturnTrue_AndObject_WhenNationalIdIsValid()
    {
        var value = "30101011234567";

        var result = EgyptianNationalId.TryCreate(value, out var nationalId);

        Assert.True(result);
        Assert.NotNull(nationalId);
    }

    [Fact]
    public void TryCreate_ShouldReturnFalse_AndNull_WhenFormatIsInvalid()
    {
        var value = "123"; // invalid format

        var result = EgyptianNationalId.TryCreate(value, out var nationalId);

        Assert.False(result);
        Assert.Null(nationalId);
    }

    [Fact]
    public void TryCreate_ShouldReturnFalse_WhenDomainValidationFails()
    {
        // invalid governorate code (99)
        var value = "30101019999999";

        var result = EgyptianNationalId.TryCreate(value, out var nationalId);

        Assert.False(result);
        Assert.Null(nationalId);
    }

    [Fact]
    public void BirthDateComponents_ShouldMatch_BirthDate()
    {
        var id = new EgyptianNationalId("30101011234567");

        Assert.Equal(2001, id.BirthYear);
        Assert.Equal(1, id.BirthMonth);
        Assert.Equal(1, id.BirthDay);
    }

    [Fact]
    public void IsValid_ShouldReturnTrue_WhenNationalIdIsValid()
    {
        var value = "30101011234567";

        var result = EgyptianNationalId.IsValid(value);

        Assert.True(result);
    }

    [Fact]
    public void IsValid_ShouldReturnFalse_WhenFormatIsInvalid()
    {
        var value = "123";

        var result = EgyptianNationalId.IsValid(value);

        Assert.False(result);
    }

    [Fact]
    public void IsValid_ShouldReturnFalse_WhenDomainValidationFails()
    {
        var value = "30101019999999"; // invalid governorate

        var result = EgyptianNationalId.IsValid(value);

        Assert.False(result);
    }
}
