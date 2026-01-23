namespace Egypt.Net.Core.Exceptions;

public sealed class InvalidBirthDateException : EgyptianNationalIdException
{
    public InvalidBirthDateException(string reason)
        : base(reason)
    {
    }
}
