namespace Egypt.Net.Core.Exceptions;

public sealed class InvalidGovernorateCodeException : EgyptianNationalIdException
{
    public InvalidGovernorateCodeException(string code)
        : base($"Invalid governorate code: {code}")
    {
    }
}
