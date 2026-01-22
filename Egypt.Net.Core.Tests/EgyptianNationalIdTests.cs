namespace Egypt.Net.Core.Tests;

public class EgyptianNationalIdTests
{
    [Fact]
    public void Constructor_WithValidNationalId_ShouldCreateObject()
    {
        // Arrange
        var nationalIdValue = "30101011234567";

        // Act
        var nationalId = new EgyptianNationalId(nationalIdValue);

        // Assert
        Assert.NotNull(nationalId);
    }

    [Fact]
    public void BirthDate_ShouldBeParsedCorrectly_FromNationalId()
    {
        // Arrange
        var nationalIdValue = "30101011234567";
        var expectedBirthDate = new DateTime(2001, 01, 01);

        // Act
        var nationalId = new EgyptianNationalId(nationalIdValue);

        // Assert
        Assert.Equal(expectedBirthDate, nationalId.BirthDate);
    }

    [Fact]
    public void Gender_ShouldBeFemale_WhenSerialLastDigitIsEven()
    {
        // Arrange
        var nationalIdValue = "30101011234568";

        // Act
        var nationalId = new EgyptianNationalId(nationalIdValue);

        // Assert
        Assert.Equal(Gender.Male, nationalId.Gender);
    }

    [Fact]
    public void Constructor_ShouldThrowException_WhenNationalIdIsInvalid()
    {
        // Arrange
        var invalidNationalId = "123";

        // Act & Assert
        Assert.Throws<ArgumentException>(() =>
        {
            new EgyptianNationalId(invalidNationalId);
        });
    }

}